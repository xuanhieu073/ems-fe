import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export type Company = {
  id: number;
  name: string;
};

@Injectable({ providedIn: 'root' })
export class CompanyService {
  httpClient = inject(HttpClient);

  private readonly BaseUrl = 'http://localhost:8080/api/companies';

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.BaseUrl);
  }
}
