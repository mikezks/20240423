import { Routes } from '@angular/router';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent
          }
        ]
      }
    ]
  }
];

export default BOOKING_ROUTES;
