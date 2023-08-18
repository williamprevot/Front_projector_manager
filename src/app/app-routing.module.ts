import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectorStatusListComponent } from './projector-status-list/projector-status-list.component';
const routes: Routes = [ 
  { path: '', component: ProjectorStatusListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
