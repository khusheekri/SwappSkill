import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './features/auth/register/register.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    
    
      

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LoginComponent,
    SidebarComponent,
    RouterModule,
    DashboardComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
