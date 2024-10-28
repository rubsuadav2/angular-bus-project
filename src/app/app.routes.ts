import { Routes } from '@angular/router';

// local imports
import { SearchComponent } from './components/search/search.component';
import { BookingComponent } from './components/booking/booking.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { adminGuard } from './guard/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  { path: 'booking/:id', component: BookingComponent },
  {path: 'schedule', component: ScheduleComponent, canActivate: [adminGuard]}
];
