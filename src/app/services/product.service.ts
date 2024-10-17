import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { AuthStore } from '../store/auth.store';

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
  authStore = inject(AuthStore);

  headers$ = this.authStore.authToken$.pipe(
    map((authToken) => ({
      Authorization: authToken,
      'content-type': 'application/json',
    }))
  );

  getProducts(limit = 20, offset = 0): Observable<any> {
    return this.httpClient.get<any>(this.BaseUrl);
  }

  getProductsByFilter(params: { query: string; categoryId?: number }) {
    return this.httpClient.get<Product[]>(`${this.BaseUrl}/filter`, {
      params,
    });
  }

  getPriceRange(): Observable<PriceRange> {
    return this.httpClient.get<PriceRange>(`${this.BaseUrl}/price-range`);
  }

  getProductById(id: number) {
    return this.httpClient.get<Product>(`${this.BaseUrl}/${id}`);
  }

  updateProduct(id: number, updatedProduct: Product) {
    return this.headers$.pipe(
      switchMap((headers) =>
        this.httpClient.put<Product>(`${this.BaseUrl}/${id}`, updatedProduct, {
          headers,
        })
      )
    );
  }

  createProduct(product: Product) {
    return this.headers$.pipe(
      switchMap((headers) =>
        this.httpClient.post<Product>(`${this.BaseUrl}`, product, {
          headers,
        })
      )
    );
  }

  deleteProduct(productId: number) {
    return this.headers$.pipe(
      switchMap((headers) =>
        this.httpClient.delete(`${this.BaseUrl}/${productId}`, {
          headers,
          responseType: 'text' as 'json',
        })
      )
    );
  }
}
