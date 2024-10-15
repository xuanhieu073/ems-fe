import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthStore } from '../store/auth.store';
import { map, of, switchMap } from 'rxjs';

type Category = {
  name: string;
};

type Company = {
  name: string;
};

type Color = {
  name: string;
  hexValue: string;
};

type Product = {
  name: string;
  price: number;
  rating: number;
  description: string;
  freeShip: boolean;
  categoryId: number;
  companyId: number;
  colorsId: number[];
};

@Injectable({
  providedIn: 'root',
})
export class SeedService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);
  private baseUrl = 'http://localhost:8080/api';

  // private headers = {
  //   Authorization: this.authStore.authToken$.toPromise(),
  //   'content-type': 'application/json',
  // };

  headers$ = this.authStore.authToken$.pipe(
    map((authToken) => ({
      Authorization: authToken,
      'content-type': 'application/json',
    }))
  );

  seedCategory(body: Category) {
    return this.headers$.pipe(
      switchMap((headers) =>
        this.http.post(`${this.baseUrl}/categories`, body, {
          headers,
        })
      )
    );
  }

  seedCompany(body: Company) {
    return this.headers$.pipe(
      switchMap((headers) =>
        this.http.post(`${this.baseUrl}/companies`, body, {
          headers,
        })
      )
    );
  }

  seedColor(body: Color) {
    return this.headers$.pipe(
      switchMap((headers) =>
        this.http.post(`${this.baseUrl}/colors`, body, {
          headers,
        })
      )
    );
  }

  seedProduct(body: Product) {
    return this.headers$.pipe(
      switchMap((headers) =>
        this.http.post(`${this.baseUrl}/products`, body, {
          headers,
        })
      )
    );
  }
}
