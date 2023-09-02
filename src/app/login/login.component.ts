import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  login(): void {
    if (this.validateForm()) {
      this.authService.login(this.email, this.password)
        .then(() => {
          // Logique de succès ici, par exemple, redirigez vers la page d'accueil
        })
        .catch(error => {
          this.errorMessage = error.message; // Affichez l'erreur dans le modèle
        });
    }
  }

  validateForm(): boolean {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      return false;
    }
    if (!this.email) {
      this.errorMessage = 'L\'adresse e-mail est requise.';
      return false;
    }
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Veuillez entrer une adresse e-mail valide.';
      return false;
    }

    return true;
  }

  forgotPassword(): void {
    if (this.validateEmail()) {
      // Logique pour le mot de passe oublié (cela peut déclencher une méthode dans votre AuthService pour réinitialiser le mot de passe)
      this.authService.ForgotPassword(this.email)
        .then(() => {
          // Informez l'utilisateur que les instructions de réinitialisation du mot de passe ont été envoyées
          this.errorMessage = "Veuillez consulter votre email pour les instructions de réinitialisation.";
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
    }
  }

  validateEmail(): boolean {
    this.errorMessage = '';

    if (!this.email) {
      this.errorMessage = 'L\'adresse e-mail est requise.';
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
