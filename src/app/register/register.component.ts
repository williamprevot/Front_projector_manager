import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  organisation: string = '';
  role: string = '';
  passwordVerif: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  GoogleAuth() {
    this.authService.GoogleAuth().then(res => {
      // Traitez la réponse si nécessaire.
    });
  }

  register(): void {
    if (this.validateForm()) {
      this.authService.register(this.email, this.password, this.organisation, this.role)
        .then(() => {
          this.authService.login(this.email, this.password)
          .then(() => {
            this.successMessage = 'Inscription réussie! Vous êtes maintenant connecté.';
          })
          .catch(error => {
            this.errorMessage = error.message;
          });
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
    }
  }

  validateForm(): boolean {
    this.errorMessage = '';

    if (!this.organisation || !this.role || !this.email || !this.password || !this.passwordVerif) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      return false;
    }

    if (this.password !== this.passwordVerif) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return false;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
      return false;
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Veuillez entrer une adresse e-mail valide.';
      return false;
    }

    return true;
  }
}
