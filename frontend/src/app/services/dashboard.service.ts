import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url =  import.meta.env['VITE_API_URL'];
  
  constructor(private httpClient:HttpClient) { }

  getDetails(){
    return this.httpClient.get(this.url + "/dashboard/details");
  }
}
