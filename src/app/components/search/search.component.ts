import { Component, OnInit } from '@angular/core';

// local imports
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  locations: any;
  searchObj: any = {
    fromLocation: '',
    toLocation: '',
    travelDate: '',
  };
  busList: any[] = [];

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.masterService.getLocations().subscribe((data) => {
      this.locations = data;
    });
  }

  searchBuses() {
    this.masterService
      .searchBus(
        this.searchObj.fromLocation,
        this.searchObj.toLocation,
        this.searchObj.travelDate
      )
      .subscribe((data) => {
        this.busList = data;
      });
  }
}
