import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlertsErrorsSurveyService {

  private apiUrl=  environment.apiUrl; 
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  // Récupère les erreurs avec des filtres optionnels
  getErrors(filters?: { cinema_id?: string, projector_id?: string }): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiUrl}/errors`, { headers });
  }

  // Récupère les alertes avec des filtres optionnels
  getAlerts(filters?: { cinema_id?: string, projector_id?: string }): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey
    });
    return this.http.get<any[]>(`${this.apiUrl}/alerts`, { headers });
  }
}