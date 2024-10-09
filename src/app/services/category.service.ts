import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

export type Category = {
  id: number;
  name: string;
}
@Injectable({providedIn: 'root'})
export class CategoryService {
  private httpClient = inject(HttpClient);

  private readonly BaseUrl = "http://localhost:8080/api/categories";

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<any>(this.BaseUrl);
  }
}