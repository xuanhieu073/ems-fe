import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { AuthenticationService } from '../services/authentication.service';
import { AuthStore } from '../store/auth.store';

@Component({
  standalone: true,
  imports: [
    HlmInputDirective,
    HlmButtonDirective,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
    <div class="h-screen flex items-center justify-center">
      <form
        class="flex flex-col gap-4"
        [formGroup]="loginForm"
        (submit)="onSubmit()"
      >
        <div class="flex flex-col gap-2">
          <label for="username">Username</label>
          <input
            id="username"
            class="w-80"
            hlmInput
            placeholder="username"
            type="username"
            formControlName="username"
          />
          <div
            *ngIf="username!.invalid && (username!.dirty || username!.touched)"
            class="alert alert-danger"
          >
            <div *ngIf="username!.hasError('required')">
              username is required.
            </div>
            <div *ngIf="username!.hasError('minlength')">
              username must be at least 4 characters long.
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">Passoword</label>
          <input
            id="password"
            class="w-80"
            hlmInput
            placeholder="password"
            type="password"
            formControlName="password"
          />
        </div>
        <button type="submit" hlmBtn [disabled]="!loginForm.valid">
          Login
        </button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  private authenticationService = inject(AuthenticationService);
  private authStore = inject(AuthStore);

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    this.authenticationService
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe((res) => {
        this.authStore.setAccessToken({ accessToken: res.accessToken });
      });
  }
}
