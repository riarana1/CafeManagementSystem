import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '@/app/shared/api-constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl = API_BASE_URL;

  constructor(private httpClient: HttpClient) {}

  getDetails() {
    return this.httpClient.get(`${this.baseUrl}/dashboard/details`);
  }
}
