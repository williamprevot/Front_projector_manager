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

  statusSymbols = {
    active: '✔️',
    idle: '💤',
    watching: '👀',
    error: '❌'
  };
  
  constructor(private projectorService: ProjectorVisuService) { }

  ngOnInit(): void {
    this.loadCinemas();
  }

  loadCinemas(): void {
    this.projectorService.getCinemas().subscribe(data => {
      this.cinemas = data;
    });
  }

  loadProjectorsByCinema(cinemaId: string): void {
    this.projectorService.getProjectorsByCinemaId(cinemaId).subscribe(
      (projectors) => {
        this.projectors = projectors;
      },
      (error) => {
        console.error('Error loading projectors:', error);
      }
    );
  }
  

  onCinemaSelect(): void {
    if (this.selectedCinema) {
      this.loadProjectorsByCinema(this.selectedCinema);
    } else {
      this.projectors = [];
    }
  }
}