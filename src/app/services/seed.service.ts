import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';

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
  private baseUrl = 'http://localhost:8080/api';
  private token =
    'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcyODEzNjE0NCwiZXhwIjoxNzI4NzQwOTQ0fQ.sbXAcXZN4EofVAsutcLokVpuCwdw-jfMZKV0KuWXnQ4EEC5HVvIl5Yq6zEWvQQS8';
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
