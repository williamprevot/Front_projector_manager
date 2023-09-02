import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Assurez-vous que ce chemin est correct.

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }
    // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion.
    this.router.navigate(['index/signIn']);
    return false;
  }
}
