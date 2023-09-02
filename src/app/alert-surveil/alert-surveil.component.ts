import { Component, OnInit } from '@angular/core';
import { AlertsErrorsSurveyService } from '../alerts-errors-survey.service';

@Component({
  selector: 'app-alert-surveil',
  templateUrl: './alert-surveil.component.html',
  styleUrls: ['./alert-surveil.component.css']
})
export class AlertSurveilComponent implements OnInit {
  errors: any[] = [];
  alerts: any[] = [];
  constructor(private alertsErrorsSurveyService: AlertsErrorsSurveyService) { }

  ngOnInit(): void {
    this.fetchErrors();
    this.fetchAlerts();
  }

  fetchErrors(): void {
    this.alertsErrorsSurveyService.getErrors({ cinema_id: 'votreCinemaId' }) // Remplacez 'votreCinemaId' par l'ID que vous souhaitez utiliser
      .subscribe(data => {
        this.errors = data;
      });
  }

  fetchAlerts(): void {
    this.alertsErrorsSurveyService.getAlerts({ projector_id: 'votreProjectorId' }) // Remplacez 'votreProjectorId' par l'ID que vous souhaitez utiliser
      .subscribe(data => {
        this.alerts = data;
      });
  }

}
