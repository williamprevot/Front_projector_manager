import { Injectable } from '@angular/core';
import { CinemaCreationRequest } from './cinema-creation-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProjectorConnectionRequest } from './projector-connection-request';

@Injectable({
  providedIn: 'root'
})
export class CinemaCreationService {
  private readonly API_URL =  environment.apiUrl;

  constructor(private http: HttpClient) { }

  createCinema(cinemaData: CinemaCreationRequest): Observable<any> {
    // Remplacez 'path_to_create_cinema' par votre endpoint approprié.
    return this.http.post(`${this.API_URL}/path_to_create_cinema`, cinemaData);
  }

  connectProjector(projectorData: ProjectorConnectionRequest): Observable<any> {
    // Remplacez 'path_to_connect_projector' par votre endpoint approprié.
    return this.http.post(`${this.API_URL}/path_to_connect_projector`, projectorData);
  }
}