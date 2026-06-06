import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@/app/shared/api-constants';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private readonly baseUrl = API_BASE_URL;

  constructor(private httpClient: HttpClient) {}

  generateReport(data: any) {
    return this.httpClient.post(`${this.baseUrl}/bill/generateReport`, data);
  }

  getPdf(data: any): Observable<Blob> {
    return this.httpClient.post(`${this.baseUrl}/bill/getPdf`, data, { responseType: 'blob' });
  }

  getBills() {
    return this.httpClient.get(`${this.baseUrl}/bill/getBills`);
  }
  delete(id: any) {
    return this.httpClient.post(`${this.baseUrl}/bill/delete/${id}`, {});
  }
}
