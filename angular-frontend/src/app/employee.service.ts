import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8083/api/v1/employees";
  

  constructor(private httpClient: HttpClient) { }

  

  uploadFile(file: File): Observable<number>{
    const formData: FormData = new FormData();
    formData.append("file", file);

    return this.httpClient.post(this.baseURL+ "/upload", formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getUploadProgress(event)),
    );
  }

  private getUploadProgress(event: any): number{
    if (event.type === HttpEventType.UploadProgress){
      const percentDone = Math.round((event.loaded / event.total) * 100);
      return percentDone;
    }
    return event;
  }
  

  getFiles(): Observable<any> {
    return this.httpClient.get<Employee[]>(this.baseURL);
  }

  // downloadImage(imageName: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/octet-stream'
  //   });
  //   return this.httpClient.get(`http://localhost:4200/downloadImage?imageName=${imageName}`, { headers, responseType: 'arraybuffer' });
  // }


  downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
    return this.httpClient.get(`${this.baseURL}/download/${fileId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }


  getEmployeeList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}