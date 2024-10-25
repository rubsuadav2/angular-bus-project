import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// local imports
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
})
export class BookingComponent {
  // TODO:
  // -SEND EMAIL TO THE USER WITH THE CONFIRMATION OF THE BOOKING
  // -REFACTOR THE SWEETALERT MESSAGES
  scheduleId: number = 0;
  scheduleDetails: any;

  seatArray: number[] = [];
  bookedSeats: number[] = [];

  userSelectedSeats: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private masterService: MasterService
  ) {
    this.activateRoute.params.subscribe((params: any) => {
      this.scheduleId = params.id;
      this.getScheduleDetails();
      this.getBookedSeats();
    });
  }

  getScheduleDetails() {
    this.masterService.getScheduleById(this.scheduleId).subscribe((res) => {
      this.scheduleDetails = res;
      for (let i = 1; i <= this.scheduleDetails.totalSeats; i++) {
        this.seatArray.push(i);
      }
    });
  }

  getBookedSeats() {
    this.masterService.getBookedSeats(this.scheduleId).subscribe((res) => {
      this.bookedSeats = res;
    });
  }

  checkIfSeatBooked(seatNumber: number) {
    return this.bookedSeats.indexOf(seatNumber);
  }

  selectSeat(seatNumber: number) {
    const seatIndex = this.checkIfSeatSelected(seatNumber);
    if (seatIndex !== -1) {
      // Deselct the seat if already selected
      this.userSelectedSeats.splice(seatIndex, 1);
    } else {
      const passengerObj = {
        passengerId: 0,
        bookingId: 0,
        passengerName: '',
        age: 0,
        gender: '',
        seatNo: seatNumber,
      };
      this.userSelectedSeats.push(passengerObj);
    }
  }

  checkIfSeatSelected(seatNumber: number) {
    return this.userSelectedSeats.findIndex(
      (seat) => seat.seatNo === seatNumber
    );
  }

  doBooking() {
    const loggedUserData = localStorage.getItem('user');
    if (loggedUserData) {
      const bookObj = {
        bookingId: 0,
        custId: JSON.parse(loggedUserData).userId,
        bookingDate: new Date(),
        scheduleId: this.scheduleId,
        BusBookingPassengers: this.userSelectedSeats,
      };
      this.masterService.booking(bookObj).subscribe({
        next: (res) => {
          console.log('response is', res);
          Swal.fire({
            icon: 'success',
            title: 'Booking Successful',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // send email to the user with the confirmation (mirar res)
            window.location.reload();
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: JSON.stringify(err),
            timer: 1500,
            showConfirmButton: false,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please login to book the ticket',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
}
