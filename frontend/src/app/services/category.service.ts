import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@/app/shared/api-constants';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseUrl = API_BASE_URL;

  constructor(private httpClient: HttpClient) {}

  add(data: { name: string }) {
    return this.httpClient.post<{ message: string }>(`${this.baseUrl}/category/add`, data);
  }

  update(data: { id: number; name: string }) {
    return this.httpClient.post<{ message: string }>(`${this.baseUrl}/category/update`, data);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/category/get`);
  }

  getFilteredCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/category/get?filterValue=true`);
  }
}
