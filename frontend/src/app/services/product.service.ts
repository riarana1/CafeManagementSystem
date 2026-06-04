import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly url = (import.meta.env['VITE_API_URL'] || 'http://localhost:8081').replace(
    /\/$/,
    '',
  );

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(`${this.url}/product/add`, data);
  }

  update(data: any) {
    return this.httpClient.post(`${this.url}/product/update`, data);
  }

  getProducts() {
    return this.httpClient.get(`${this.url}/product/get`);
  }

  updateStatus(data: any) {
    return this.httpClient.post(`${this.url}/product/updateProductStatus`, data);
  }

  delete(id: any) {
    return this.httpClient.post(`${this.url}/product/delete/${id}`, {});
  }

  getProductByCategory(id: any) {
    return this.httpClient.get(`${this.url}/product/getByCategory/${id}`);
  }

  getById(id: any) {
    return this.httpClient.get(`${this.url}/product/getProductById/${id}`);
  }
}
