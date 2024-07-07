import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RisksService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRisks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Risks`);
  }

  getRisksByAuditId(auditId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Risks/GetByAuditId/${auditId}`);
  }
  addRisk(risk: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Risks`, risk);
  }
  updateRisk(risk: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Risks/${risk.riskId}`, risk);
  }
  getRiskById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Risks/GetById/${id}`);
  }
  deleteRisk(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Risks/${id}`);
  }
}
