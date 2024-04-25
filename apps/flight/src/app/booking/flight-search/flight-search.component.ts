import { JsonPipe } from '@angular/common';
import { Component, effect, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { patchState, signalState } from '@ngrx/signals';
import { injectBookingFacade } from '../+state';
import { FlightFilter } from '../+state/ngrx-signal-store/booking.store';
import { Flight } from '../../model/flight';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap } from 'rxjs';


@Component({
    selector: 'app-flight-search',
    templateUrl: './flight-search.component.html',
    styleUrl: './flight-search.component.scss',
    standalone: true,
    imports: [FormsModule, FlightCardComponent, JsonPipe]
})
export class FlightSearchComponent {
  bookingFacade = injectBookingFacade();

  localState = signalState({
    filter: {
      from: 'Hamburg',
      to: 'Graz'
    },
    flights: [] as Flight[],
    basket: {
      3: true,
      5: true
    } as Record<number, boolean>
  });

  constructor() {
    effect(() => {
      const flights = this.bookingFacade.flights();
      untracked(
        () => patchState(this.localState, { flights })
      );
    });

    /* (rxMethod<Flight[]>(pipe(
      tap(flights => patchState(this.localState, { flights }))
    )))(this.bookingFacade.flights()); */
  }

  updateFilter(filter: Partial<FlightFilter>): void{
    patchState(this.localState, state => ({
      filter: {
        ...state.filter,
        ...filter
      }
    }));
  }

  search(): void {
    this.bookingFacade.search(
      this.localState.filter.from(),
      this.localState.filter.to()
    );
  }
}
