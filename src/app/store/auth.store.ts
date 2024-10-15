import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { User } from '../models/user';
import { tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

export interface AuthState {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStore extends ComponentStore<AuthState> {
  router = inject(Router);

  accessToken$ = this.select((s) => s.accessToken);
  authToken$ = this.select((s) => `Bearer ${s.accessToken}`);

  constructor() {
    super({ accessToken: '' });
    this.initializeEffect();
    this.saveEffect(this.accessToken$);
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

  logoutEffect = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => {
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
