import { Routes } from '@angular/router';
import { CORE_ROUTES } from './core/core.routes';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'booking',
    pathMatch: 'full'
  },
  ...CORE_ROUTES,
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.routes')
  }
];
