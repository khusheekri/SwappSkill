import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8764/api/users';

  constructor(private http: HttpClient) { }

  register(userData: any) : Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData, {responseType: 'text'});
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  getUser(userId:number){
    return this.http.get<any>(this.baseUrl+"/"+userId);
  }

  verifyEmail(email: string) : Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-email`, {email})
  }

  resetPassword(data: any) : Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, data, {responseType: 'text'});
  }
}