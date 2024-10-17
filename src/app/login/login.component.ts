import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { toast } from 'ngx-sonner';
import { AuthenticationService } from '../services/authentication.service';
import { AuthStore } from '../store/auth.store';

@Component({
  standalone: true,
  imports: [
    HlmInputDirective,
    HlmButtonDirective,
    ReactiveFormsModule,
    CommonModule,
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmToasterComponent,
  ],
  template: `
    <div class="h-screen flex items-center justify-center">
      <hlm-tabs [tab]="currentTab()" class="block max-w-3xl mx-auto">
        <hlm-tabs-list
          class="w-full grid grid-cols-2"
          aria-label="tabs example"
        >
          <button hlmTabsTrigger="login" (click)="setTab('login')">
            Login
          </button>
          <button hlmTabsTrigger="register" (click)="setTab('register')">
            Sign up
          </button>
        </hlm-tabs-list>
        <div hlmTabsContent="login">
          <form
            class="flex flex-col gap-4"
            [formGroup]="loginForm"
            (submit)="onLoginSubmit()"
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
                *ngIf="
                  username!.invalid && (username!.dirty || username!.touched)
                "
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
        <div hlmTabsContent="register">
          <form
            class="flex flex-col gap-4"
            [formGroup]="registerForm"
            (submit)="onRegisterSubmit()"
          >
            <div class="flex flex-col gap-2">
              <label for="registerusername">Username</label>
              <input
                id="registerusername"
                class="w-80"
                hlmInput
                placeholder="username"
                type="username"
                formControlName="username"
              />
              <div
                *ngIf="
                  registerForm.get('username')?.invalid &&
                  (registerForm.get('username')?.dirty ||
                    registerForm.get('username')?.touched)
                "
                class="alert alert-danger"
              >
                <div *ngIf="registerForm.get('username')?.hasError('required')">
                  username is required.
                </div>
                <div
                  *ngIf="registerForm.get('username')?.hasError('minlength')"
                >
                  username must be at least 4 characters long.
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label for="registeremail">Username</label>
              <input
                id="registeremail"
                class="w-80"
                hlmInput
                placeholder="email"
                type="email"
                formControlName="email"
              />
              <div
                *ngIf="
                  registerForm.get('email')?.invalid &&
                  (registerForm.get('email')?.dirty ||
                    registerForm.get('email')?.touched)
                "
                class="alert alert-danger"
              >
                <div *ngIf="registerForm.get('email')?.hasError('required')">
                  email is required.
                </div>
                <div *ngIf="registerForm.get('email')?.hasError('email')">
                  invalid email
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label for="registername">Your name</label>
              <input
                id="registername"
                class="w-80"
                hlmInput
                placeholder="name"
                type="name"
                formControlName="name"
              />
              <div
                *ngIf="
                  registerForm.get('name')?.invalid &&
                  (registerForm.get('name')?.dirty ||
                    registerForm.get('name')?.touched)
                "
                class="alert alert-danger"
              >
                <div *ngIf="registerForm.get('name')?.hasError('required')">
                  name is required.
                </div>
                <div *ngIf="registerForm.get('name')?.hasError('minlength')">
                  name must be at least 4 characters long.
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label for="registerpassword">Password</label>
              <input
                id="registerpassword"
                class="w-80"
                hlmInput
                placeholder="password"
                type="password"
                formControlName="password"
              />
            </div>
            <div
              *ngIf="
                registerForm.get('password')?.invalid &&
                (registerForm.get('password')?.dirty ||
                  registerForm.get('password')?.touched)
              "
              class="alert alert-danger"
            >
              <div *ngIf="registerForm.get('password')?.hasError('required')">
                password is required.
              </div>
              <div *ngIf="registerForm.get('password')?.hasError('minlength')">
                password must be at least 4 characters long.
              </div>
            </div>
            <button type="submit" hlmBtn [disabled]="!registerForm.valid">
              Signup
            </button>
          </form>
        </div>
      </hlm-tabs>
    </div>
    <hlm-toaster />
  `,
})
export class LoginComponent {
  private authenticationService = inject(AuthenticationService);
  private authStore = inject(AuthStore);
  private router = inject(Router);
  location = inject(Location);

  currentTab = signal('login');

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

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  // constructor() {
  //   this.authStore.accessToken$.pipe(
  //     tap(accessToken => {
  //       if(accessToken) {
  //         this.router.navigate(['/dashboard/products']);
  //       }
  //     })
  //   ).subscribe(() => {})
  // }
  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
  onLoginSubmit() {
    this.authenticationService
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe((res) => {
        const payload = this.parseJwt(res.accessToken);
        this.authStore.setAccessToken({ accessToken: res.accessToken });
        if (payload.sub === 'admin') {
          this.router.navigate(['/dashboard/products']);
        } else {
          this.location.back();
        }
      });
  }

  onRegisterSubmit() {
    const username = this.registerForm.value.username!;
    const email = this.registerForm.value.email!;
    const name = this.registerForm.value.name!;
    const password = this.registerForm.value.password!;
    this.authenticationService
      .register(username, email, name, password)
      .subscribe((res) => {
        toast(res, {});
        this.currentTab.set('login');
      });
  }

  setTab(tabName: string) {
    this.currentTab.set(tabName);
  }
}
