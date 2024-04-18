import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

export type Color = {
  id: number;
  name: string;
}

@Injectable({providedIn: 'root'})
export class ColorService {
  httpClient = inject(HttpClient);

  private readonly BaseUrl = "http://localhost:8080/api/colors";

  getColors(): Observable<Color[]> {
    return this.httpClient.get<Color[]>(this.BaseUrl);
  }
}