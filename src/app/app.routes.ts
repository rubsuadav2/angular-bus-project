import { Routes } from '@angular/router';

// local imports
import { SearchComponent } from './components/search/search.component';
import { BookingComponent } from './components/booking/booking.component';

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
];
