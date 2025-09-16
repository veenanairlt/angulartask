import 'zone.js'; // Required unless you run zoneless

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';                         // 👈 standalone App root component
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockApiService } from './app/core/services/mock-api.service';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimations(),
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(MockApiService, { delay: 500 })
    )
  ]
}).catch(err => console.error(err));