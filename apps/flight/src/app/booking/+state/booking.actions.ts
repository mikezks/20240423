import { createActionGroup, props } from '@ngrx/store';
import { Flight } from '../../model/flight';


export const bookingActions = createActionGroup({
  source: 'booking',
  events: {
    'filter changed': props<{ from: string, to: string }>(),
    'flights loaded': props<{ flights: Flight[] }>()
  }
});
