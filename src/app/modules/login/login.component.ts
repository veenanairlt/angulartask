import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule,MatSnackBarModule]
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
private snackBar = inject(MatSnackBar);
  // ✅ Add Validators
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  // handle submit
onSubmit() {
  if (this.form.valid) {
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: () => {
        // success → redirect
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // 401 (Invalid credentials) → show snackbar or alert
        this.snackBar.open(
          err?.error?.message || 'Invalid email or password',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          }
        );
      }
    });
  }
}
}