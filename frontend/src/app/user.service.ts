import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignupRequest, UserLoginRequest } from './models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = (import.meta.env['VITE_API_URL'] || 'http://localhost:8081').replace(
    /\/$/,
    '',
  );

  constructor(private httpClient: HttpClient) {
    if (!import.meta.env['VITE_API_URL']) {
      console.warn(`[UserService] VITE_API_URL is missing in .env. Falling back to: ${this.url}`);
    } else {
      console.log(`[UserService] API initialized at: ${this.url}`);
    }
  }

  signup(data: UserSignupRequest) {
    console.log('Sending Signup Payload:', data);
    return this.httpClient.post(`${this.url}/user/signup`, data);
  }

  forgotPassword(data: { email: string }) {
    console.log('Sending Forgot Password Payload:', data);
    return this.httpClient.post(`${this.url}/user/forgotPassword`, data);
  }

  changePassword(data: any) {
    return this.httpClient.post(`${this.url}/user/changePassword`, data);
  }

  login(data: UserLoginRequest) {
    console.log('Sending Login Payload:', data);
    return this.httpClient.post<{ token: string }>(`${this.url}/user/login`, data);
  }

  checkToken(): Observable<any> {
    if (!localStorage.getItem('token')) {
      return of(null);
    }
    return this.httpClient.get<any>(`${this.url}/user/checkToken`);
  }

  getUsers() {
    return this.httpClient.get<UserSignupRequest[]>(`${this.url}/user/get`);
  }

  update(data: any) {
    return this.httpClient.post(`${this.url}/user/update`, data);
  }
}
