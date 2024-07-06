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
}
