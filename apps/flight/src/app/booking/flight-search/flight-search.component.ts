import { Component, Injector, inject, runInInjectionContext } from '@angular/core';
import { Flight } from '../../model/flight';
import { FlightService } from '../services/flight.service';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-flight-search',
    templateUrl: './flight-search.component.html',
    styleUrl: './flight-search.component.scss',
    standalone: true,
    imports: [FormsModule, FlightCardComponent, JsonPipe]
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);
  private injector = inject(Injector);

  from = 'Hamburg';
  to = 'Graz';
  flights: Flight[] = [];
  basket: Record<number, boolean> = {
    3: true,
    5: true
  };

  constructor() {
    inject(FlightService);
  }

  search(): void {

    this.injector.get(FlightService);
    runInInjectionContext(this.injector,
      () => inject(FlightService)
    );

    this.flightService?.find(this.from, this.to)
      .subscribe(
        flights => this.flights = flights
      );
  }
}
