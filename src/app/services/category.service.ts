import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private httpClient = inject(HttpClient);

  getCategories(): Observable<any[]> {
    return this.httpClient.get<any>(`${environment.apiUrl}/categories`);
  }
}
