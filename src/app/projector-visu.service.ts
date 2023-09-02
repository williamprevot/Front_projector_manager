import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectorVisuService {
  //appelle securisé a l api
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  //---------------Projectors-status-list-component-------------------//
  getCinemas(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiUrl}/cinemas`, { headers });
  }

  getProjectorsByCinemaId(cinemaId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiUrl}/cinemas/${cinemaId}/projectors`, { headers });
  }

  getProjectorStatusByCinemaId(cinemaId: string,projectorId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiUrl}cinemas/${cinemaId}/projectors/${projectorId}`, { headers });
  }
  //---------------Projector-details-component-------------------//
  getProjectorDetails(cinemaId: string, projectorId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any>(`${this.apiUrl}/cinemas/${cinemaId}/projectors/${projectorId}`, { headers });
  }

  // Reports = maintenance programmée + reparation imprevu
  getReportsByProjectorId(cinemaId: string, projectorId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiUrl}/cinemas/${cinemaId}/projectors/${projectorId}/details/reports`, { headers });
  }
  addMaintenanceReport(cinemaId: string, projectorId: string, report: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.post<any>(`${this.apiUrl}/cinemas/${cinemaId}/projectors/${projectorId}/details/reports`, report, { headers });
  }
}