import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly url = (import.meta.env['VITE_API_URL'] || 'http://localhost:8081').replace(
    /\/$/,
    '',
  );

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(`${this.url}/category/add`, data);
  }

  update(data: any) {
    return this.httpClient.post(`${this.url}/category/update`, data);
  }

  getCategorys() {
    return this.httpClient.get(`${this.url}/category/get`);
  }

  getFilteredCategorys() {
    return this.httpClient.get(`${this.url}/category/get?filterValue=true`);
  }
}
