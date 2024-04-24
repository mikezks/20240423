import { ActivatedRoute, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { inject } from '@angular/core';
import { FlightService } from './services/flight.service';
import { map, of, switchMap } from 'rxjs';


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
            component: FlightEditComponent,
            data: {
              // id: 999
            },
            resolve: {
              flight: (route: ActivatedRouteSnapshot) => {
                const flightService = inject(FlightService);
                return of(route.paramMap).pipe(
                  map(params => +(params.get('id') || 0)),
                  switchMap((id: number) => {
                    const flight = flightService.flights().find(
                      flight => flight.id === id
                    );
                    if (flight) {
                      return of(flight);
                    }

                    return flightService.findById(id);
                  })
                );
              }
            }
          }
        ]
      }
    ]
  }
];

export default BOOKING_ROUTES;
