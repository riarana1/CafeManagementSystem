import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignupRequest, UserLoginRequest } from '@/app/models';
import { Observable, of } from 'rxjs';
import { API_BASE_URL } from '@/app/shared/api-constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = API_BASE_URL;

  constructor(private httpClient: HttpClient) {}

  signup(data: UserSignupRequest) {
    return this.httpClient.post(`${this.baseUrl}/user/signup`, data);
  }

  forgotPassword(data: { email: string }) {
    return this.httpClient.post(`${this.baseUrl}/user/forgotPassword`, data);
  }

  login(data: UserLoginRequest) {
    return this.httpClient.post<{ token: string }>(`${this.baseUrl}/user/login`, data);
  }

  checkToken(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!localStorage.getItem('token')) {
      return of(null);
    }
    return this.httpClient.get<any>(`${this.baseUrl}/user/checkToken`);
  }

  changePassword(data: any) {
    return this.httpClient.post(`${this.baseUrl}/user/changePassword`, data);
  }

  getUsers() {
    return this.httpClient.get<UserSignupRequest[]>(`${this.baseUrl}/user/get`);
  }

  update(data: any) {
    return this.httpClient.post(`${this.baseUrl}/user/update`, data);
  }
}
