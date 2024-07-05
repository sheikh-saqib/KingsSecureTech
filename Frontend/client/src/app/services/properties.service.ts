import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getPropertiesByClientId(clientId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/Properties/${clientId}`);
  }

  getProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Properties`);
  }
}
