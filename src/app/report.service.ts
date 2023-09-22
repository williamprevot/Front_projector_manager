// report.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Riport } from './riport';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly apiUrl = 'http://localhost:3000/api'
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  // Reports = maintenance programmée + reparation imprevu
  getReportsByProjectorId(cinemaId: string, projectorId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiUrl}/cinemas/${cinemaId}/projectors/${projectorId}/details/reports`, { headers });
    
  }

  getReportById(cinemaId: string, projectorId: string, id: string): Observable<Riport> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<Riport>(`${this.apiUrl}/cinemas/${cinemaId}/projectors/${projectorId}/details/reports/${id}`, { headers });
  }

  addReport(cinemaId: string, projectorId: string, riport: Riport): Observable<Riport> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.post<Riport>(`${this.apiUrl}/cinemas/${cinemaId}/projectors/${projectorId}/details/reports`, riport, { headers });
  }

  updateReport(cinemaId: string, projectorId: string, id: string, riport: Riport): Observable<Riport> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.put<Riport>(`${this.apiUrl}/cinemas/${cinemaId}/projectors/${projectorId}/details/reports/${id}`, riport, { headers });
  }

  deleteReport(cinemaId: string, projectorId: string, id: string): Observable<{ message: string, riport: Riport }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.delete<{ message: string, riport: Riport }>(`${this.apiUrl}/cinemas/${cinemaId}/projectors/${projectorId}/details/reports/${id}`, { headers });
  }

}
