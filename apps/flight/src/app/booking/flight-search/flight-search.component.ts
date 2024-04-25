import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { injectBookingFacade } from '../+state';
import { FlightCardComponent } from '../flight-card/flight-card.component';


@Component({
    selector: 'app-flight-search',
    templateUrl: './flight-search.component.html',
    styleUrl: './flight-search.component.scss',
    standalone: true,
    imports: [FormsModule, FlightCardComponent, JsonPipe]
})
export class FlightSearchComponent {
  bookingFacade = injectBookingFacade();
  from = signal('Hamburg');
  lazyFrom$ = toObservable(this.from).pipe(
    debounceTime(300)
  );
  lazyFrom = toSignal(this.lazyFrom$, {
    initialValue: this.from()
  });
  to = signal('Graz');
  flights = this.bookingFacade.flights;
  basket = signal<Record<number, boolean>>({
    3: true,
    5: true
  });
  flightRoute = computed(
    () => 'From ' + this.lazyFrom() + ' to ' + this.to() + '.'
  );

  search(): void {
    this.bookingFacade.search(this.from(), this.to());
  }
}
