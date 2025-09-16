import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let mockAuth: any;
  let mockRouter: any;

  beforeEach(() => {
    mockAuth = { login: jasmine.createSpy('login').and.returnValue(of(true)) };
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuth },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should navigate to dashboard on successful login', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const comp = fixture.componentInstance;
    comp.form.setValue({ email: 'test@example.com', password: 'password' });
    comp.onSubmit();

    expect(mockAuth.login).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not submit invalid form', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const comp = fixture.componentInstance;
    comp.onSubmit();

    expect(mockAuth.login).not.toHaveBeenCalled();
  });
});