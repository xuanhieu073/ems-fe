import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type PriceRange = {
  min: number;
  max: number;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly BaseUrl = 'http://localhost:8080/api/products';
  httpClient = inject(HttpClient);

  getProducts(limit = 20, offset = 0): Observable<any> {
    return this.httpClient.get<any>(this.BaseUrl);
  }

  getPriceRange(): Observable<PriceRange> {
    return this.httpClient.get<PriceRange>(`${this.BaseUrl}/price-range`);
  }
}
