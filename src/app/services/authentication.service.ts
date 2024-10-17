import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  register(username: string, email: string, name: string, password: string) {
    return this.httpClient.post<string>(
      `${environment.apiUrl}/auth/register`,
      {
        username,
        email,
        name,
        password,
      },
      { responseType: 'text' as 'json' }
    );
  }
}
