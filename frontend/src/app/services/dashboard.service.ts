import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly url = (import.meta.env['VITE_API_URL'] || 'http://localhost:8081').replace(
    /\/$/,
    '',
  );

  constructor(private httpClient: HttpClient) {}

  getDetails() {
    return this.httpClient.get(`${this.url}/dashboard/details`);
  }
}
