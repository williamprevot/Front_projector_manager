import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectorStatusListComponent } from './projector-status-list/projector-status-list.component';
import { ProjectorVisuService } from './projector-visu.service';
import { WebSocketService } from './websocket.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProjectorDetailComponent } from './projector-detail/projector-detail.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { IndexComponent } from './index/index.component';
import { ProfilComponent } from './profil/profil.component';
import { ReportDetailDialogComponent } from './report-detail-dialog/report-detail-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ToastrModule } from 'ngx-toastr';
import { AlertSurveilComponent } from './alert-surveil/alert-surveil.component';
import { MatBadgeModule } from '@angular/material/badge';
import { GraphAnalysisComponent } from './graph-analysis/graph-analysis.component';

const config: SocketIoConfig = {
  url: 'http://localhost:8080', options: {
    autoConnect: false,  // Pour empêcher la connexion automatique lors de l'initialisation
    reconnection: true,  // Pour permettre la reconnexion
    reconnectionAttempts: 10,  // Nombre de tentatives de reconnexion avant d'abandonner
    reconnectionDelay: 3000,   // Délai entre chaque tentative (en ms)
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ProjectorStatusListComponent,
    LoginComponent,
    ProjectorDetailComponent,
    RegisterComponent,
    IndexComponent,
    ProfilComponent,
    ReportDetailDialogComponent,
    ForgotPasswordComponent,
    AlertSurveilComponent,
    GraphAnalysisComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    MatBadgeModule 

  ],
  providers: [
    ProjectorVisuService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
