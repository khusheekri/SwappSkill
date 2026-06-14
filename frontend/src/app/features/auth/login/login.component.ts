import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  loading = false;
  errorMsg = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.auth.login(this.form.value as any).subscribe({

      next: (user: any) => {

        // Save logged-in user details
        localStorage.setItem('user', JSON.stringify(user));

        // Save user id separately
        localStorage.setItem('userId', user.id.toString());

        this.loading = false;

        // Navigate after successful login
        this.router.navigate(['/dashboard']);
      },

      error: (err) => {

        this.errorMsg =
          err.error?.message || 'Invalid email or password';

        this.loading = false;
      }

    });
  }
}