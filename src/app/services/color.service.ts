import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type Color = {
  id: number;
  name: string;
  hexValue: string;
};

@Injectable({ providedIn: 'root' })
export class ColorService {
  httpClient = inject(HttpClient);

  private readonly BaseUrl = `${environment.apiUrl}/colors`;

  getColors(): Observable<Color[]> {
    return this.httpClient.get<Color[]>(this.BaseUrl);
  }
}
