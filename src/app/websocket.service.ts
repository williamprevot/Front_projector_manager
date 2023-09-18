import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProjectorStatusUpdate } from './projector-status-update';
const config: SocketIoConfig = { 
  url: 'http://localhost:8080', 
  options: {
    path: '/socket.io', 
    transports: ['websocket', 'polling'] 
  }
};

@Injectable({
  providedIn: 'root',
})

export class WebSocketService {
  private clientId: string | null = null; // Identifiera de manière unique ce client
  private statusSubject: BehaviorSubject<ProjectorStatusUpdate | null> = new BehaviorSubject<ProjectorStatusUpdate | null>(null);
  public status$: Observable<ProjectorStatusUpdate | null> = this.statusSubject.asObservable();
  // private readonly API_URL = environment.apiUrl;
  // private apiKey = environment.apiKey;

  constructor(private socket: Socket, private http: HttpClient) { // Si l'utilisateur est connecté, récupérez l'ID utilisateur du localStorage
    this.socket = new Socket(config);
 
  }


  connectWebSocket(clientId: string) {
    if (!this.clientId) {
      console.warn("Aucun clientId trouvé. Vérifiez si l'utilisateur est connecté.");
      return;
    }

    // Set up connection error handlers
    this.setupConnectionHandlers();

    // Connect and register
    const config: any = { query: `clientId=${this.clientId}` };
    this.socket.ioSocket.io.opts = config;
    this.socket.connect();
    this.socket.on('connect', () => {
      this.socket.emit('register', this.clientId);
    });
  }
    // Écoute des erreurs de connexion
    private setupConnectionHandlers(): void {
    this.socket.on('connect_error', (error: any) => {
      console.error('Erreur de connexion WebSocket:', error);
      alert('Erreur de connexion WebSocket.');
    });

    this.socket.on('connect_timeout', () => {
      console.error('Temps de connexion WebSocket dépassé.');
      alert('Temps de connexion WebSocket dépassé.');
    });

    // Écoute des tentatives de reconnexion et des erreurs de reconnexion
    this.socket.on('reconnect', (attemptNumber: number) => {
      console.log('Reconnecté après', attemptNumber, 'tentatives.');// Par exemple, alerte après 3 tentatives pour éviter de spammer l'utilisateur.
      alert(`Tentative de reconnexion ${attemptNumber} fois. Veuillez vérifier votre connexion.`);
    });

    this.socket.on('reconnect_error', (error: any) => {
      console.error('Erreur lors de la tentative de reconnexion:', error);
      alert('Erreur lors de la tentative de reconnexion. Veuillez vérifier votre connexion.');
    });
  }
  // Méthode pour récupérer les dernières entrées de la base de données et les envoyer aux clients WebSocket
  requestLatestProjectorStatusFromServer(cinemaId: string, projectorId: string): void {
    console.log(`Requesting latest projector status for cinemaId: ${cinemaId} and projectorId: ${projectorId}`);
    // Émettre une demande au serveur pour qu'il recherche le dernier statut
    // this.socket.emit('fetchLatestProjectorStatus', { cinemaId, projectorId, clientId: this.clientId});
    this.socket.emit('fetchLatestProjectorStatus', { cinemaId, projectorId, clientId: this.clientId});
  }
  onMessage(): Observable<ProjectorStatusUpdate> {
    return this.socket.fromEvent<ProjectorStatusUpdate>('updateProjectorStatus').pipe(
      // Vous pouvez ajouter le log ici pour visualiser chaque message.
      tap((message) => console.log('WebSocket Message Received:', message)),
      catchError((error) => {
        console.error('Error in WebSocket:', error);
        return throwError(error);
      })
    );
  }
  disconnectWebSocket() {
    if (this.clientId) {
      this.socket.emit('unregister', this.clientId);
      this.clientId = null;
    }
    this.socket.disconnect();
  }
}