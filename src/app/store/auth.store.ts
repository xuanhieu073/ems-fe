import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { User } from '../models/user';
import { tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

export interface AuthState {
  accessToken: string;
  user: {
    username: string;
    roles: string[];
  } | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStore extends ComponentStore<AuthState> {
  router = inject(Router);

  accessToken$ = this.select((s) => s.accessToken);
  authToken$ = this.select((s) => `Bearer ${s.accessToken}`);
  isAuthenticated$ = this.select((s) => !!s.accessToken);
  user$ = this.select(s => s.user);

  constructor() {
    super({ accessToken: '', user: { username: '', roles: [] } });
    this.initializeEffect();
    this.saveEffect(this.accessToken$);
    this.loginEffect(this.accessToken$);
  }
  initializeEffect = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) this.patchState({ accessToken });
      })
    )
  );
  
  saveEffect = this.effect<string>((trigger$) =>
    trigger$.pipe(
      tap((accessToken) => {
        if (accessToken) localStorage.setItem('accessToken', accessToken);
        else localStorage.removeItem('accessToken');
      })
    )
  );

  loginEffect = this.effect<string>((trigger$) =>
    trigger$.pipe(
      tap((accessToken) => {
        if(accessToken) {
          const jwtPayload = decodeJWTPayload(accessToken);
          this.patchState({
            user: { username: jwtPayload.sub, roles: jwtPayload.roles },
          });
        }
      })
    )
  );

  logoutEffect = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => {
        this.patchState({accessToken: '', user: null})
        this.router.navigate(['/']);
      })
    )
  );

  setAccessToken = this.updater<{ accessToken: string }>(
    (state, { accessToken }) => ({
      ...state,
      accessToken,
    })
  );
}

function decodeJWTPayload(token: string) {
  try {
    // Split the JWT into its three parts
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    // Decode the payload (the second part of the JWT)
    const payload = parts[1];
    const decodedPayload = atob(payload); // Decode from Base64

    // Parse the JSON payload
    return JSON.parse(decodedPayload);
  } catch (error: any) {
    console.error('Failed to decode JWT payload:', error.message);
    return null;
  }
}
