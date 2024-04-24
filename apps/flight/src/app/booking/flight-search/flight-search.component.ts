import { JsonPipe } from '@angular/common';
import { Component, Injector, computed, effect, inject, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../model/flight';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { FlightService } from '../services/flight.service';
import { debounceTime } from 'rxjs';
import { SIGNAL } from '@angular/core/primitives/signals';


@Component({
    selector: 'app-flight-search',
    templateUrl: './flight-search.component.html',
    styleUrl: './flight-search.component.scss',
    standalone: true,
    imports: [FormsModule, FlightCardComponent, JsonPipe]
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);

  from = signal('Hamburg');
  lazyFrom$ = toObservable(this.from).pipe(
    debounceTime(300)
  );
  lazyFrom = toSignal(this.lazyFrom$, {
    initialValue: this.from()
  });
  to = signal('Graz');
  flights = signal<Flight[]>([]);
  basket = signal<Record<number, boolean>>({
    3: true,
    5: true
  });
  flightRoute = computed(
    () => 'From ' + this.lazyFrom() + ' to ' + this.to() + '.'
  );

  search(): void {
    this.flightService?.find(this.from(), this.to())
      .subscribe(
        flights => this.flights.set(flights)
      );
  }
}
