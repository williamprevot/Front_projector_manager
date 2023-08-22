import { NgModule } from '@angular/core';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectorStatusListComponent } from './projector-status-list/projector-status-list.component';
import { ProjectorVisuService } from './projector-visu.service';
import { WebSocketService } from './websocket.service';
import { LoginComponent } from './login/login.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from '../environments/environment';


const config: SocketIoConfig = { url: 'ws://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ProjectorStatusListComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule ,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
  ],
  providers: [ProjectorVisuService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
