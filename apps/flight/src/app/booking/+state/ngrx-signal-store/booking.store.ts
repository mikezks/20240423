import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Flight } from '../../../model/flight';
import { computed, inject } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { of, pipe, switchMap, tap } from 'rxjs';

export type FlightFilter = {
  from: string;
  to: string;
};

export type BookState = {
  flights: Flight[];
  filter: FlightFilter;
};

export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState<BookState>({
    flights: [],
    filter: {
      from:  'Hamburg',
      to: 'Graz'
    }
  }),
  withComputed(({ flights }) => ({
    delayedFlights: computed(
      () => flights().filter(
        flight => flight.delayed === true
      )
    )
  })),
  // Updater
  withMethods(store => ({
    setFlights: (flights: Flight[]) =>
      patchState(store, { flights }),
    updateFilter: (filter: FlightFilter) =>
      patchState(store, state => ({
        filter: {
          ...state.filter,
          from: filter.from
        }
      }))
  })),
  // Effects
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    loadFlights: async (from: string, to: string) => {
      const flights = await flightService.findAsPromise(from, to);
      console.log('Signal Store Flight', flights);
      store.setFlights(flights);
    },
    loadFlightRx: rxMethod<FlightFilter>(pipe(
      switchMap(filter => flightService.find(
        filter.from, filter.to
      )),
      tap(flights => store.setFlights(flights))
    ))
  }))
);


new BookingStore().loadFlightRx(of({ from: '', to: ''}))
