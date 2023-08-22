import { Component, OnInit } from '@angular/core';
import { ProjectorVisuService } from '../projector-visu.service';
import { WebSocketService } from '../websocket.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
interface WebSocketMessage {
  projector_id: string;
  model:string;
  status: string;
  // ... other properties
}

@Component({
  selector: 'app-projector-status-list',
  templateUrl: './projector-status-list.component.html',
  styleUrls: ['./projector-status-list.component.css'],
    animations: [
      trigger('statusChange', [
        state('active', style({ opacity: 1 })),
        state('idle', style({ opacity: 0.7 })),
        state('watching', style({ opacity: 0.9 })),
        state('error', style({ opacity: 0.5 })),
        transition('* => *', animate('500ms'))
      ])
  ]
})
export class ProjectorStatusListComponent implements OnInit {
  cinemas: any[] = [];
  selectedCinema: string = '';
  projectors: any[] = [];
  projectorStatus: { [key: string]: string } = {}; // Tableau pour stocker les statuts mis à jour
  statusSymbols : { [key: string]: string } =  {
    active: '✔️',
    idle: '💤',
    watching: '👀',
    error: '❌'
  };
 

  constructor(
    private webSocketService: WebSocketService,
    private projectorService: ProjectorVisuService) { }

  ngOnInit(): void {
    this.loadCinemas();
    this.connectWebSocket();
    this.webSocketService.updateProjectorStatusFromDatabase(); // Récupérer les dernières entrées au démarrage
  }
  ngOnDestroy(): void  {
    this.webSocketService.disconnectWebSocket(); // Déconnecte du serveur WebSocket lorsque le composant est détruit
  }
//  // Méthode pour se connecter au serveur WebSocket
connectWebSocket(): void  {
  this.webSocketService.connectWebSocket;
  //this.webSocketService.connectWebSocket('YOUR_UNIQUE_CLIENT_ID_HERE')
  this.webSocketService.onMessage().subscribe((message: WebSocketMessage) => {
    // Traite ici le message WebSocket reçu, mettez à jour l'interface utilisateur, et ajoutez des animations
    console.log('Message WebSocket reçu:', message);

    // Exemple : Mettez à jour le statut d'un projecteur (à adapter à votre logique)
    const projectorId = message.projector_id;
    const newStatus = message.status;
    this.projectorStatus[projectorId] = newStatus;

    // Vous pouvez également déclencher des animations ici en fonction du nouveau statut
  });
}

  disconnectWebSocket(): void { 
    this.webSocketService.disconnectWebSocket();
  }

// // Pour afficher la liste des cinemas
  loadCinemas(): void {
    this.projectorService.getCinemas().subscribe(data => {
      this.cinemas = data;
      // Charger les projecteurs pour le premier cinéma (si disponible)
      if (this.cinemas.length > 0) {
        this.selectedCinema = this.cinemas[0].cinema_id; // Sélectionner le premier cinéma de la liste
        this.loadProjectorsByCinema(this.cinemas[0].cinema_id);
      }
    });
  }
  
 // // Pour afficher les porjecteurs par cinema 
  loadProjectorsByCinema(cinemaId: string): void {
    this.projectorService.getProjectorsByCinemaId(cinemaId).subscribe(
      (projectors) => {
        this.projectors = projectors;
        this.updateProjectorStatus(); // Mettre à jour les statuts de projecteurs
      },
      (error) => {
        console.error('Error loading projectors:', error);
      }
    );
  }
 // // Pour selectionner un cinema 
  onCinemaSelect(): void {
    if (this.selectedCinema) {
      this.loadProjectorsByCinema(this.selectedCinema);
    } else {
      this.projectors = [];
    }
  }
    // Méthode pour mettre à jour les statuts de projecteurs
    updateProjectorStatus() {
      this.projectors.forEach((projector) => {
        this.projectorStatus[projector.projector_id] = projector.status;
      });
    }

    getStatusImage(status: string): string {
      switch (status) {
        case 'active':
          return 'assets/active.png';
        case 'idle':
          return 'assets/idle.png';
        case 'watching':
          return 'assets/watching.png';
        case 'error':
          return 'assets/error.png';
        default:
          return 'assets/default.png'; // Image par défaut si le statut est inconnu
      }
    }
  
    onProjectorClick(projector: any): void {
      // Gérez ici le comportement lorsque l'utilisateur clique sur un projecteur.
      // Vous pouvez ouvrir une boîte de dialogue, afficher des détails, etc.
      // Utilisez les données du projecteur (projector) pour personnaliser l'action.
      console.log('Projector clicked:', projector);
    }

  // Méthode pour démarrer les mises à jour en temps réel
  // startRealtimeUpdates() {
  //   setInterval(() => {
  //     this.onCinemaSelect();
  //   }, 1000); // Mettez à jour toutes les 5 secondes (vous pouvez ajuster l'intervalle)
  // }
}