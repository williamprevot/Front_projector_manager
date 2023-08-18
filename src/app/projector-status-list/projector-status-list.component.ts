import { Component, OnInit } from '@angular/core';
import { ProjectorVisuService } from '../projector-visu.service';
@Component({
  selector: 'app-projector-status-list',
  templateUrl: './projector-status-list.component.html',
  styleUrls: ['./projector-status-list.component.css']
})
export class ProjectorStatusListComponent implements OnInit {
  selectedCinema: string = '';
  cinemas: any[] = [];
  projectors: any[] = [];
  constructor(private projectorVisuService: ProjectorVisuService) { }
  
  ngOnInit(): void {
    this.projectorVisuService.getCinemas().subscribe(data => {
      this.cinemas = data;
    });
    
    this.projectorVisuService.getProjectorStatus().subscribe(projectors => {
      this.projectors = projectors;
    });
  }

  onCinemaChange(): void {
    this.projectorVisuService.getProjectorsByCinema(this.selectedCinema).subscribe(data => {
      console.log(data); 
      this.projectors = data;
    });
  }
}