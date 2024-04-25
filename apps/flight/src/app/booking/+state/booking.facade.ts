import { inject } from "@angular/core"
import { Store } from "@ngrx/store"
import { bookingActions } from "./booking.actions";
import { bookingFeature } from "./booking.reducer";

export const injectBookingFacade = (store = inject(Store)) => ({
  flights: store.selectSignal(bookingFeature.selectFlights),
  search: (from: string, to: string) => store.dispatch(
    bookingActions.filterChanged({ from, to })
  )
});
