import { Component, inject } from '@angular/core';
import { Flight } from '../../model/flight';
import { FlightService } from '../services/flight.service';


@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);

  from = 'Hamburg';
  to = 'Graz';
  flights: Flight[] = [];
  basket: Record<number, boolean> = {
    3: true,
    5: true
  };

  search(): void {
    this.flightService?.find(this.from, this.to)
      .subscribe(
        flights => this.flights = flights
      );
  }
}
