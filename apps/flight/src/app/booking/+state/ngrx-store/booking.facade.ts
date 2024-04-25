import { inject } from "@angular/core"
import { Store } from "@ngrx/store"
import { bookingActions } from "./booking.actions";
import { bookingFeature } from "./booking.reducer";
import { BookingStore } from "../ngrx-signal-store/booking.store";

/* export const injectBookingFacade = (store = inject(Store)) => ({
  flights: store.selectSignal(bookingFeature.selectFlights),
  search: (from: string, to: string) => store.dispatch(
    bookingActions.filterChanged({ from, to })
  )
}); */

export const injectBookingFacade = (store = inject(BookingStore)) => ({
  flights: store.flights,
  search: (from: string, to: string) =>
    store.loadFlights(from, to)
});
