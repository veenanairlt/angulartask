import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent} from './dashboard.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let comp: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: { userEmail: () => 'tester@example.com', logout: jasmine.createSpy('logout') } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;
  });

  it('should display user email', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('tester@example.com');
  });

  it('should logout and navigate', () => {
    comp.logout();
    const router = TestBed.inject(Router);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});