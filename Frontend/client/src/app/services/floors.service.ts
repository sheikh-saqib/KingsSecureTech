import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FloorsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFloorsByAuditId(auditId: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}/Floors/GetByAuditId/${auditId}`
    );
  }
  getFloorsByAreaId(areaId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/Areas/GetByAreaId/${areaId}`);
  }
}
