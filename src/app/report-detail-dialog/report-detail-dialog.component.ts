import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../report.service';
import { User } from '../user';
import { Riport} from '../riport'; // Assurez-vous d'ajuster le chemin si nécessaire

@Component({
  selector: 'app-report-detail-dialog',
  templateUrl: './report-detail-dialog.component.html',
  styleUrls: ['./report-detail-dialog.component.css']
})
export class ReportDetailDialogComponent {
  currentUser!: User;
  @Input() riport!: Riport;
  editing: boolean = false;
  updatedMessage: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private reportService: ReportService) { }

  startEditing() {
    this.editing = true;
    this.updatedMessage = this.data.message;
  }

  updateReport(reportId: string, updatedMessage: string) {
    // Vérifier si l'utilisateur est autorisé
    if (this.currentUser.role !== "AUTHORIZED_ROLE") {
      alert("Vous n'avez pas la permission de mettre à jour ce rapport.");
      return;
    }
  
    let updatedData: Riport = {
      reportId: this.riport.reportId, // Utilisation du paramètre reportId
      cinema: this.riport.cinema, // Si cela provient d'une source externe (comme un dialogue), utilisez this.data.cinema
      projector: this.riport.projector,
      date: new Date(),
      type: this.riport.type,
      message: this.updatedMessage, // Utilisation du paramètre updatedMessage
      responsible: this.currentUser.uid
    };
  
    // Vérification des champs essentiels
    if (!updatedData.message || !updatedData.responsible) {
      alert('Échec de la mise à jour: les champs sont vides ou non definis.');
      return;
    }
  
    this.reportService.updateReport(this.riport.cinema, this.riport.projector, reportId, updatedData).subscribe(
      data => {
        alert('Le rapport a été mis à jour avec succès.');
      },
      error => {
        console.error('Erreur lors de la mise à jour du rapport :', error);
        alert('Une erreur s\'est produite lors de la mise à jour.');
      }
    );
  }
  

  deleteReport(reportId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rapport?')) {
      this.reportService.deleteReport(this.riport.cinema, this.riport.projector, reportId).subscribe(
        data => {
          alert('Le rapport a été supprimé avec succès.');
        },
        error => {
          console.error('Erreur lors de la suppression du rapport :', error);
          alert('Une erreur s\'est produite lors de la suppression.');
        }
      );
    }
  }
}