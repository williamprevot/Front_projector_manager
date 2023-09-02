import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectorVisuService } from '../projector-visu.service';
import { ReportService } from '../report.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ReportDetailDialogComponent } from '../report-detail-dialog/report-detail-dialog.component';
import { Riport } from '../riport';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user';

@Component({
  selector: 'app-projector-detail',
  templateUrl: './projector-detail.component.html',
  styleUrls: ['./projector-detail.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ])
  ]
})
export class ProjectorDetailComponent implements OnInit {
  projectorId: string = '';
  cinemaId: string = '';
  projectorDetails: any = {};
  currentStatus: any = {};
  reports: Riport[] = [];
  reportForm!: FormGroup;
  currentUser!: User;
  showForm: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private projectorService: ProjectorVisuService,
    private reportService: ReportService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.reportForm = this.fb.group({
      reportType: ['', Validators.required],
      newMessage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectorId = this.route.snapshot.paramMap.get('projectorId')!;
    this.cinemaId = this.route.snapshot.paramMap.get('cinemaId')!;
    this.loadProjectorDetails(this.cinemaId, this.projectorId);
    this.loadReports(this.cinemaId, this.projectorId);
    this.currentUser = this.getCurrentUser();
  }
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  loadProjectorDetails(cinemaId: string, projectorId: string): void {
    this.projectorService.getProjectorDetails(cinemaId, projectorId).subscribe(data => {
      // console.log("Projector Details:", data); 
      this.projectorDetails = data[0];
      // Vérifiez d'abord si le tableau status_history existe et n'est pas vide
      if (this.projectorDetails.status_history && this.projectorDetails.status_history.length > 0) {
        // Prenez la dernière entrée du tableau status_history
        this.currentStatus = this.projectorDetails.status_history[this.projectorDetails.status_history.length - 1];
      }

    }, error => {
      console.error(error);
      alert('Error loading projector details!');
    });
  }

  loadReports(cinemaId: string, projectorId: string): void {
    this.reportService.getReportsByProjectorId(cinemaId, projectorId).subscribe(data => {
      this.reports = data;
    }, error => {
      console.error(error);
      alert('Error loading maintenance details!');
    });
  }
  showReportDetails(report: Riport) {
    this.dialog.open(ReportDetailDialogComponent, {
      width: '400px',
      data: report
    });
  }
  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.currentUser && this.reportForm.valid) {
      let riport: Riport = {
        reportId: uuidv4(), // Generating a unique reportId using uuid
        cinema: this.projectorDetails.cinema_id,
        projector: this.projectorId,
        date: new Date(),
        type: this.reportForm.value.reportType as 'maintenance' | 'reparation',
        message: this.reportForm.value.newMessage,
        responsible: this.currentUser.uid
      };

      this.reportService.addReport(this.cinemaId, this.projectorId, riport).subscribe(response => {
        this.reports.push(response);
        this.reportForm.reset({ reportType: 'maintenance' }); // Resetting the form
        alert('Riport submitted successfully!');
      }, error => {
        console.error(error);
        alert('Error submitting riport!');
      });
    } else {
      alert("No current user found. Cannot submit the report.");
    }
  }
}
