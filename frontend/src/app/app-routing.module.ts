import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MySkillsComponent } from './features/my-skills/my-skills.component';
import { MatchesComponent } from './features/matches/matches.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
       { path: 'mySkills', component: MySkillsComponent },
       {path:'matches', component:MatchesComponent}
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
