import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
auth = inject(AuthService);
  router = inject(Router);

  goItems() { this.router.navigate(['/list']); }
  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
