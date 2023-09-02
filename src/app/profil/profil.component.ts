import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: User | null = null;
  newEmail: string = '';
  constructor(public authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }
    ngOnInit(): void {
      const storedUser = localStorage.getItem('user');
      console.log("stored User:",storedUser)
      if (storedUser) {
        this.user = JSON.parse(storedUser) as User;
      }
    }
  async updateUserProfile() {
    // Supposez que l'ID de l'utilisateur est disponible dans `this.authService.userData.uid`
    const uid = this.authService.userData.uid;
    const updatedData = {
      email: this.authService.userData.email,
      organisation: this.authService.userData.organisation,
      role: this.authService.userData.role
    };

    this.authService.updateUserInMongoDB(uid, updatedData)
      .then(() => {
        this.toastr.success('Profil mis à jour avec succès!');
      })
      .catch(error => {
        this.toastr.error('Erreur lors de la mise à jour du profil');
        console.error("Error updating profile:", error);
      });
  }

  updateEmail() {
    // Code to update the email in the backend
    // You might want to use the user's UID or some other identifier
    // to specify which user's email you are updating
  }

  sendInvitation() {
    // Code to send an invitation, perhaps by sending an email
    // to the new email address with a link to register or join the team
  }
  
  navigateToProjectors(cinemaId: string) {
    this.router.navigate(['cinemas', cinemaId, 'projectors']);
  }
}
