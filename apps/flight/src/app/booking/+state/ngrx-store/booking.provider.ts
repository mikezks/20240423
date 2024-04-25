import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { BookingEffects } from "./booking.effects";
import { bookingFeature } from "./booking.reducer";

export function provideBookingFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(bookingFeature),
    provideEffects([BookingEffects])
  ]);
}
