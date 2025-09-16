import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CookieService } from 'ngx-cookie-service';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        // ✅ Register HttpClient AND our interceptor with the functional API
        provideHttpClient(withInterceptors([AuthInterceptor])),
        provideHttpClientTesting(),
      ]
    });

    http = TestBed.inject(HttpClient);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should attach token header', () => {
    const cookie = TestBed.inject(CookieService);
    cookie.set('token', '123');

    http.get('/api/test').subscribe();

    const req = httpCtrl.expectOne('/api/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer 123');
  });
});