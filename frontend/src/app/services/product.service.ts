import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '@/app/shared/api-constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = API_BASE_URL;

  constructor(private httpClient: HttpClient) {}

  add(data: Record<string, any>) {
    return this.httpClient.post(`${this.baseUrl}/product/add`, data);
  }

  update(data: Record<string, any>) {
    return this.httpClient.post(`${this.baseUrl}/product/update`, data);
  }

  getProducts() {
    return this.httpClient.get(`${this.baseUrl}/product/get`);
  }

  updateStatus(data: { id: number; status: string }) {
    return this.httpClient.post(`${this.baseUrl}/product/updateProductStatus`, data);
  }

  delete(id: number | string) {
    return this.httpClient.post(`${this.baseUrl}/product/delete/${id}`, {});
  }

  getProductByCategory(id: number | string) {
    return this.httpClient.get(`${this.baseUrl}/product/getByCategory/${id}`);
  }

  getById(id: number | string) {
    return this.httpClient.get(`${this.baseUrl}/product/getProductById/${id}`);
  }
}
