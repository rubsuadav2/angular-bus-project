import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiURL = '/api/BusBooking';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiURL}/GetBusLocations`);
  }

  searchBus(from: number, to: number, travelDate: string): Observable<any> {
    return this.http.get(
      `${this.apiURL}/searchBus?fromLocation=${from}&toLocation=${to}&travelDate=${travelDate}`
    );
  }
}
