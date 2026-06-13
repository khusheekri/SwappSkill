import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/app/Environment';

export interface User {
  id: number;
  name: string;
  email: string;
  skillsOffered: string[];
  skillsWanted: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = `${environment.apiUrl}/users`;

  currentUser$ = new BehaviorSubject<User | null>(null);

  // REGISTER
  register(userData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      userData,
      { responseType: 'text' }
    );
  }

  // LOGIN
  login(credentials: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser$.next(null);
    this.router.navigate(['/login']);
  }
}