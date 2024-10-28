import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// local imports
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnInit {
  isFormVisible: boolean = true;

  locations: any[] = [];
  schedule: any = {
    scheduleId: 0,
    vendorId: 0,
    busName: '',
    busVehicleNo: '',
    fromLocation: 0,
    toLocation: 0,
    departureTime: '',
    arrivalTime: '',
    scheduleDate: '',
    price: 0,
    totalSeats: 0,
  };
  schedules: any[] = [];

  constructor(private masterService: MasterService) {
    const vendor = localStorage.getItem('user');
    this.schedule.vendorId = vendor ? JSON.parse(vendor).userId : 0;
    const schedules = localStorage.getItem('schedules');
    this.schedules = schedules ? JSON.parse(schedules) : [];
  }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    this.masterService.getLocations().subscribe((data: any) => {
      this.locations = data;
    });
  }

  onCreateSchedule() {
    this.masterService.createSchedule(this.schedule).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Schedule created successfully',
          timer: 1500,
          showConfirmButton: false,
        });
        this.isFormVisible = false;
        this.schedules.push(res);
        localStorage.setItem('schedules', JSON.stringify(this.schedules));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error: ${err.error.message}`,
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }
}
