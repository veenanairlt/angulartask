import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  userEmail = signal<string | null>(this.cookies.get('userEmail') || null);

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: { email: string } }>(
      '/api/login',
      { email, password }
    ).pipe(
      tap(res => {
        this.cookies.set('token', res.token);
        this.cookies.set('userEmail', res.user.email);
        this.userEmail.set(res.user.email);
      })
    );
  }

  logout() {
    this.cookies.deleteAll();
    this.userEmail.set(null);
  }

  isAuthenticated(): boolean {
    return this.cookies.check('token');
  }

  getToken(): string | null {
    return this.cookies.get('token') || null;
  }
}