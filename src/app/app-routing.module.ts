import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ProfilComponent } from './profil/profil.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProjectorDetailComponent } from './projector-detail/projector-detail.component';
import { ProjectorStatusListComponent } from './projector-status-list/projector-status-list.component';
import { AlertSurveilComponent } from './alert-surveil/alert-surveil.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [ 
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'index/signIn', component: LoginComponent },
  { path: 'index/signUp', component: RegisterComponent },
  {path:'forgot-password',component: ForgotPasswordComponent},
  { path: 'cinemas/:cinemaId/projectors',canActivate: [AuthGuard],component: ProjectorStatusListComponent },
  { path: 'cinemas/:cinemaId/projectors/:projectorId',canActivate: [AuthGuard], component: ProjectorDetailComponent },
  { path: 'profil',canActivate: [AuthGuard],  component: ProfilComponent },
  {path:'alerts',canActivate: [AuthGuard],component: AlertSurveilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
