import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectorVisuService } from '../projector-visu.service';
import { WebSocketService } from '../websocket.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service'; // Assurez-vous d'ajuster le chemin en fonction de votre configuration
import { ChangeDetectorRef } from '@angular/core';
import { ProjectorStatusUpdate } from '../projector-status-update';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-projector-status-list',
  templateUrl: './projector-status-list.component.html',
  styleUrls: ['./projector-status-list.component.css'],
  animations: [
    trigger('statusChange', [
      state('active', style({ opacity: 0.8 })),
      state('idle', style({ opacity: 0.8 })),
      state('watching', style({ opacity: 0.8 })),
      state('error', style({ opacity: 0.8 })),
      transition('* <=> *', animate('500ms'))
    ])
  ]
})
export class ProjectorStatusListComponent implements OnInit, OnDestroy {

  cinemas: any[] = [];
  selectedCinema: string = '';
  projectors: any[] = [];
  projectorStatus: { [key: string]: string } = {};
  isLoading: boolean = false;
  statusUpdateTimestamp: { [key: string]: number } = {};
  totalAlerts: number = 0;
  private userId: string | null = null;
  private statusUpdateSubscription: Subscription | null = null;

  statusSymbols: { [key: string]: string } = {
    active: '✔️',
    idle: '💤',
    watching: '👀',
    error: '❌'
  };

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private webSocketService: WebSocketService,
    private projectorService: ProjectorVisuService,
    private authService: AuthService) { } // Injectez AuthService

  ngOnInit(): void {
    this.loadCinemas();
    this.connectWebSocket();
    this.startPeriodicStatusUpdates();

  }

  ngOnDestroy(): void {
    this.webSocketService.disconnectWebSocket();
    this.statusUpdateSubscription?.unsubscribe();  // Désabonner de la mise à jour périodique
  }

  connectWebSocket(): void {
    this.authService.getCurrentUserId().then(userId => {
      this.userId = userId;
      if (this.userId) {
        this.webSocketService.connectWebSocket(this.userId);
      }
    });
    this.webSocketService.onMessage().subscribe(
      (message: ProjectorStatusUpdate) => {
        console.log('Message WebSocket reçu:', message);
        this.projectorStatus[message.projectorId] = message.status;  // ajusté ici
        this.statusUpdateTimestamp[message.projectorId] = Date.now();  // et ici

        this.changeDetector.detectChanges();
      },
      error => console.error('WebSocket Error:', error)
    );

  }


  loadCinemas(): void {
    this.projectorService.getCinemas().subscribe(
      data => {
        this.cinemas = data;
        this.selectedCinema = this.cinemas[0]?.cinema_id || '';
        if (this.selectedCinema) {
          this.loadProjectorsByCinema(this.selectedCinema);
        }
      },
      error => console.error('Error fetching cinemas:', error)
    );
  }

  loadProjectorsByCinema(cinemaId: string): void {
    this.isLoading = true;
    this.projectorService.getProjectorsByCinemaId(cinemaId).subscribe(
      (projectors) => {
        this.projectors = projectors;
        if (Array.isArray(this.projectors)) {
          this.projectors.forEach((projector) => {
            this.projectorStatus[projector.projector_id] = projector.status;
            this.isLoading = false;
            this.webSocketService.requestLatestProjectorStatusFromServer(cinemaId, projector.projector_id);
          });
        } else {
          console.warn('Expected projectors to be an array, but received:', this.projectors);
        }
      },
      (error) => {
        console.error('Error loading projectors:', error);
        this.isLoading = false;
      }
    );
  }

  startPeriodicStatusUpdates(): void {
    // Commencez à vérifier le statut toutes les 5 secondes
    this.statusUpdateSubscription = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.requestProjectorStatusUpdates())
      )
      .subscribe();
       
  }
  requestProjectorStatusUpdates(): Observable<void> {
    if (this.selectedCinema && Array.isArray(this.projectors)) {
      this.projectors.forEach((projector) => {
        this.webSocketService.requestLatestProjectorStatusFromServer(this.selectedCinema, projector.projector_id);
      });
    }
    return of(void 0);  // Returns a basic observable to keep the pipe happy.
  }
  onCinemaSelect(selectedValue: string): void {
    this.projectors = [];
    this.isLoading = true;
    this.selectedCinema = selectedValue;

    if (this.selectedCinema) {
      this.loadProjectorsByCinema(this.selectedCinema);
    }
  }

  getStatusImage(status: string): string {
    switch (status) {
      case 'active': return 'assets/active.png';
      case 'idle': return 'assets/idle.png';
      case 'watching': return 'assets/watching.png';
      case 'error': return 'assets/error.png';
      default: return 'assets/default.png';
    }
  }

  onProjectorClick(projector: any): void {
    this.router.navigate(['cinemas', projector.cinema_id, 'projectors', projector.projector_id]);
  }

  goToAlerts() {
    this.router.navigate(['/alerts']);
  }

}
