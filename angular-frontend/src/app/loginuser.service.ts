import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {

  private baseUrl = "http://localhost:8083/api/v1/employees/login";

  constructor(private httpClient: HttpClient) { }

  loginUser(employee: Employee): Observable<Object>{
    console.log(employee)
    return this.httpClient.post(`${this.baseUrl}`,employee);
  }
}
