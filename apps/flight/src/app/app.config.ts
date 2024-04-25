import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterFeature } from './shared/+state/router.feature';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    isDevMode() ? provideStoreDevtools() : []
  ],
};
