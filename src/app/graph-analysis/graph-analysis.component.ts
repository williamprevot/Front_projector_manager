import { Component, OnInit } from '@angular/core';
import { GraphVisuService } from '../graph-visu.service';  // Assurez-vous que ce chemin est correct.

@Component({
  selector: 'app-graph-analysis',
  templateUrl: './graph-analysis.component.html',
  styleUrls: ['./graph-analysis.component.css']
})
export class GraphAnalysisComponent  implements OnInit{
  graphs: any[] = [];
  selectedPeriod: string = 'daily';  // valeur par défaut

  constructor(private graphVisuService: GraphVisuService) { }

  ngOnInit(): void {
    this.loadGraphs();
}

loadGraphs() {
    if (this.selectedPeriod === 'daily') {
        this.graphVisuService.getDailyGraphs().subscribe(data => {
            this.graphs = data;
        });
    } else if (this.selectedPeriod === 'monthly') {
        this.graphVisuService.getMonthlyGraphs().subscribe(data => {
            this.graphs = data;
        });
    } else if (this.selectedPeriod === 'yearly') {
        this.graphVisuService.getYearlyGraphs().subscribe(data => {
            this.graphs = data;
        });
    }
}

onPeriodChange(period: string) {
    this.selectedPeriod = period;
    this.loadGraphs();
}
}