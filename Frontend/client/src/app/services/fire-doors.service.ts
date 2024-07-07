import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FireDoorsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFireDoors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/FireDoors`);
  }

  getFireDoorsByAuditId(auditId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/FireDoors/GetByAuditId/${auditId}`
    );
  }

  addFireDoor(fireDoor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/firedoors`, fireDoor);
  }

  updateFireDoor(fireDoor: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/FireDoors/${fireDoor.fireDoorId}`,
      fireDoor
    );
  }

  getFireDoorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/FireDoors/GetById/${id}`);
  }

  deleteFireDoor(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/FireDoors/${id}`);
  }
}
