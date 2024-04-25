import { FlightService } from '../../services/flight.service';
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { bookingActions } from './booking.actions';
import { map, switchMap } from 'rxjs';

export const loadFlights = createEffect((
  actions = inject(Actions),
  flightService = inject(FlightService)
) => actions.pipe(
  ofType(bookingActions.filterChanged),
  switchMap(action => flightService.find(
    action.from,
    action.to
  )),
  map(flights => bookingActions.flightsLoaded({ flights}))
), { functional: true });

export const BookingEffects = { loadFlights };
