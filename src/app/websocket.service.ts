// WebSocketService (service WebSocket côté frontend)
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private clientId: string | null = null; // Identifiera de manière unique ce client
  private statusSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public status$: Observable<any[]> = this.statusSubject.asObservable();
  private readonly API_URL = 'http://localhost:3000/api/projector_status/latest'

  constructor(private socket: Socket, private http: HttpClient) {}

  connectWebSocket(clientId: string) {
    if (this.clientId) {
      console.warn('Client déjà connecté.');
      return;
    }

    this.clientId = clientId;
    this.socket.connect();
    this.socket.on('connect', () => {
    this.socket.emit('register', this.clientId);
    });

    this.socket.fromEvent<any[]>('updateProjectorStatus').subscribe((data) => {
      this.statusSubject.next(data);
    });
  }

  disconnectWebSocket() {
    if (this.clientId) {
      this.socket.emit('unregister', this.clientId);
      this.clientId = null;
    }
    this.socket.disconnect();
  }

  // Méthode pour récupérer les dernières entrées de la base de données et les envoyer aux clients WebSocket
  updateProjectorStatusFromDatabase(): void {
    this.http.get<any[]>(this.API_URL).pipe(
      catchError(err => {
        console.error('Error fetching projector status:', err);
        return throwError(err);
      })
    ).subscribe(data => {
      this.socket.emit('updateProjectorStatus', data);
    });
  }

  onMessage(): Observable<any> {
    return this.socket.fromEvent('updateProjectorStatus');
  }
}
