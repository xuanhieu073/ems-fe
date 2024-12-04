import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type Company = {
  id: number;
  name: string;
};

@Injectable({ providedIn: 'root' })
export class CompanyService {
  httpClient = inject(HttpClient);

  private readonly BaseUrl = `${environment.apiUrl}/companies`;

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.BaseUrl);
  }
}
