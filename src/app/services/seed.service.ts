import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';

export type Category = {
  name: string;
};

export type Company = {
  name: string;
};

export type Color = {
  name: string;
  hexValue: string;
};

export type Product = {
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
  private baseUrl = 'http://localhost:8080/api';
  private token =
    'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxMzUxNDI0OSwiZXhwIjoxNzE0MTE5MDQ5fQ.YCYqNRtU9OGZZbSVMlbtPflRx0EonzIxzGULAW-doVgXI8ph-VAQNphu2fXs9SBk';
  private headers = {
    Authorization: this.token,
    'content-type': 'application/json',
  };

  seedCategory(body: Category) {
    return this.http.post(`${this.baseUrl}/categories`, body, {
      headers: this.headers,
    });
  }

  seedCompany(body: Company) {
    return this.http.post(`${this.baseUrl}/companies`, body, {
      headers: this.headers,
    });
  }

  seedColor(body: Color) {
    return this.http.post(`${this.baseUrl}/colors`, body, {
      headers: this.headers,
    });
  }

  seedProduct(body: Product) {
    return this.http.post(`${this.baseUrl}/products`, body, {
      headers: this.headers,
    });
  }
}
