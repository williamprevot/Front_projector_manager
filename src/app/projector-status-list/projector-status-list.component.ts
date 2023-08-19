import { Component, OnInit } from '@angular/core';
import { ProjectorVisuService } from '../projector-visu.service';
@Component({
  selector: 'app-projector-status-list',
  templateUrl: './projector-status-list.component.html',
  styleUrls: ['./projector-status-list.component.css']
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

  constructor(private projectorService: ProjectorVisuService) { }

  ngOnInit(): void {
    this.loadCinemas();
    // this.startRealtimeUpdates();
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