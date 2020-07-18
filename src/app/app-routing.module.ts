import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { TeamsComponent } from './teams/teams.component';
import { LibraryComponent } from './library/library.component';
import { DrawingComponent } from './drawing/drawing.component';

import { LoginComponent, RegisterComponent, AuthGuard } from './login';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'drawing', component: DrawingComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'library', component: LibraryComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: '', component: WelcomeComponent },
  { path: '**', redirectTo: 'welcome' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
