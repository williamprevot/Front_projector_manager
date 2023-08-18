import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectorVisuService {
  private apiUrl = 'http://localhost:3000/api';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getCinemas(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiUrl}/cinemas`);
  }

  getProjectorsByCinema(cinemaId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiUrl}/projectors/${cinemaId}`, { headers });
  }

  getProjectorStatus(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(this.apiUrl);
  }
}