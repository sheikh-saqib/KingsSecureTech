import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAreasByFloorId(floorId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/Areas/GetByFloorId/${floorId}`);
  }
  getAreas() {
    return this.http.get<any[]>(`${this.apiUrl}/Areas`);
  }
}
