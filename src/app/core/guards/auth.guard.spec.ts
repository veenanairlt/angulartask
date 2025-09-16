import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard (functional)', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['isAuthenticated']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(BrowserModule),   // 🟢 Provides platform required services
        provideRouter([]),                     // 🟢 Set up router
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ]
    });
  });

  function runGuard() {
    return TestBed.runInInjectionContext(() => AuthGuard({} as any, {} as any));
  }

  it('should allow navigation when authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    const result = runGuard();

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should block navigation and redirect when not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);

    const result = runGuard();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
