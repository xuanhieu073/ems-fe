import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private httpClient = inject(HttpClient);

  login(usernameOrEmail: string, password: string) {
    return this.httpClient.post<{ accessToken: string }>(
      `${environment.apiUrl}/auth/login`,
      {
        usernameOrEmail,
        password,
      }
    );
  }
}
