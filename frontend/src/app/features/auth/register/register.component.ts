import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loading = false;
  errorMsg = '';

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {

    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],

        confirmPassword: [
          '',
          Validators.required
        ],

        bio: [
          '',
          [
            Validators.required,
            Validators.maxLength(250)
          ]
        ]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(
    form: AbstractControl
  ): ValidationErrors | null {

    const password =
      form.get('password')?.value;

    const confirmPassword =
      form.get('confirmPassword')?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  submit() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload = {

      name: this.registerForm.value.name,

      email: this.registerForm.value.email,

      password: this.registerForm.value.password,

      bio: this.registerForm.value.bio

    };

    this.loading = true;

    this.authService
      .register(payload)
      .subscribe({

        next:(response: any) => {this.loading = false;
          alert(response);
          // navigate to login
            this.router.navigate(['/login']);
        },

        error: (err:any) => {

          this.loading = false;

          this.errorMsg =
            err?.error?.message ||
            'Registration failed';
        }

      });

  }

}