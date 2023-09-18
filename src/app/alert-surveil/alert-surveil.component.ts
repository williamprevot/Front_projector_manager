import { Component, OnInit } from '@angular/core';
import { AlertsErrorsSurveyService } from '../alerts-errors-survey.service';

@Component({
  selector: 'app-alert-surveil',
  templateUrl: './alert-surveil.component.html',
  styleUrls: ['./alert-surveil.component.css']
})
export class AlertSurveilComponent implements OnInit {
  errors: any[] = [];
  errorsByCinema: { [cinemaId: string]: any[] } = {};
  
  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  constructor(private alertsErrorsSurveyService: AlertsErrorsSurveyService) { }

  ngOnInit(): void {
    this.fetchErrors();
    
  }




  fetchErrors(): void {
    this.alertsErrorsSurveyService.getErrors()
      .subscribe(data => {
        for (const error of data) {
          if (!this.errorsByCinema[error.cinema_id]) {
            this.errorsByCinema[error.cinema_id] = [];
          }
          this.errorsByCinema[error.cinema_id].push(error);
        }
      }, error => {
        console.error('Error fetching cinema alerts:', error);
      });
  }

}
