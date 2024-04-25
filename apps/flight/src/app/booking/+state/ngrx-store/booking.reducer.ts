import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { Flight } from "../../../model/flight";
import { bookingActions } from "./booking.actions";


export type BookingState = {
  flights: Flight[];
};

export const initialBookingState: BookingState = {
  flights: []
};

export const bookingFeature = createFeature({
  name: 'booking',
  reducer: createReducer(
    initialBookingState,

    on(bookingActions.flightsLoaded, (state, action) => {
      const flights = action.flights;

      return { ...state, flights };
    })
  ),
  extraSelectors: feature => ({
    selectDelayedFlights: createSelector(
      feature.selectFlights,
      flights => flights.filter(
        flight => flight.delayed === true
      )
    )
  })
});

/* const paramSelector = (myName: string) => createSelector(
  bookingFeature.selectFlights,
  flights => {

  }
);

const myCustomizedSelector = paramSelector('Michael');
 */
