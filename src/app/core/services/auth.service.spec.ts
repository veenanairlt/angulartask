import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let cookies: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        CookieService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    cookies = TestBed.inject(CookieService);
  });

  it('should login and set cookies', () => {
    service.login('test@example.com', 'password').subscribe();

    const req = http.expectOne('/api/login');
    req.flush({ token: 'mock', user: { email: 'test@example.com' } });

    expect(service.isAuthenticated()).toBeTrue();
    expect(service.userEmail()).toBe('test@example.com');
    expect(cookies.get('token')).toBe('mock');
  });

  it('should logout and clear cookies', () => {
    cookies.set('token', 'dummy');
    service.logout();

    expect(service.isAuthenticated()).toBeFalse();
    expect(service.userEmail()).toBeNull();
  });
});