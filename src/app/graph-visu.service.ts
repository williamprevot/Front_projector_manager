import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphVisuService {
  private readonly API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getDailyGraphs(): Observable<any[]> {
    return this.http.get<any[]>('/api/charts/daily');
  }

  getMonthlyGraphs(): Observable<any[]> {
    return this.http.get<any[]>('/api/charts/monthly');
  }

  getYearlyGraphs(): Observable<any[]> {
    return this.http.get<any[]>('/api/charts/yearly');
  }

}