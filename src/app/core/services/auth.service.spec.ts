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

  it('should login and set cookies + signal', () => {
    service.login('test@example.com', 'password').subscribe();

    const req = http.expectOne('/api/login');
    req.flush({ token: 'mock-token', user: { email: 'test@example.com' } });

    // ✅ cookies are set
    expect(service.isAuthenticated()).toBeTrue();
    expect(cookies.get('token')).toBe('mock-token');
    expect(service.userEmail()).toBe('test@example.com');
  });

  it('should logout and clear cookies + reset signals', () => {
    cookies.set('token', 'fake');
    service.logout();

    expect(service.isAuthenticated()).toBeFalse();
    expect(service.getToken()).toBeNull();
    expect(service.userEmail()).toBeNull();
  });
});