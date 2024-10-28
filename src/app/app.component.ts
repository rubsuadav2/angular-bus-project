import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// local imports
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoginForm: boolean = true;
  loggedUser: any;

  registerObj: any = {
    userId: 0, // automatico del backend
    userName: '', // input del formulario
    emailId: '', // input del formulario
    fullName: '', // input del formulario
    role: '', // de momento nada
    createdDate: new Date(),
    password: '', // input del formulario
    projectName: '', // automatico del backend
    refreshToken: '', // automatico del backend
    refreshTokenExpiryTime: new Date(),
  };
  loginObj: any = {
    userName: '', // input del formulario
    password: '', // input del formulario
  };

  constructor(private masterService: MasterService) {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedUser = JSON.parse(user);
    }
  }

  openModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block'; // abre el modal de login
      modal.classList.add('modal-centered'); // centra el modal con sus elementos
    }
  }

  closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none'; // cierra el modal de login
      modal.classList.remove('modal-centered'); // centra el modal con sus elementos
    }
  }

  getUserByUserName() {
    this.masterService.getAllUsers().subscribe((res) => {
      const user = res.data.find(
        (u: any) => u.userName === this.loginObj.userName
      );
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedUser = user;
      } else {
        Swal.fire({
          title: 'User Not Found!',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

  registerUser() {
    this.masterService.register(this.registerObj).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'User Registered Successfully!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        localStorage.setItem('user', JSON.stringify(res.data));
        this.loggedUser = res.data;
        this.closeModal();
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: JSON.stringify(err),
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }

  loginUser() {
    this.masterService.login(this.loginObj).subscribe({
      next: () => {
        Swal.fire({
          title: 'Logged In Successfully!',
          timer: 1500,
          icon: 'success',
          showConfirmButton: false,
        });
        const user = localStorage.getItem('user');
        if (user) {
          this.loggedUser = JSON.parse(user);
          this.closeModal();
        } else {
          this.getUserByUserName();
          this.closeModal();
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: JSON.stringify(err),
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }

  logout() {
    localStorage.removeItem('user');
    Swal.fire({
      title: 'Logged Out Successfully!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
    this.loggedUser = null;
    window.location.reload();
  }

  onRegisterVendor() {
    this.masterService.registerVendor(this.registerObj).subscribe({
      next: (res) => {
        if (res.result) {
          Swal.fire({
            title: res.message,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.loggedUser = res.data;
          localStorage.setItem('user', JSON.stringify(res.data));
          this.closeModal();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: res.message,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: JSON.stringify(err),
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }
}
