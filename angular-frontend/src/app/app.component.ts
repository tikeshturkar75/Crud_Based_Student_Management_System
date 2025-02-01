import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'Angular + Springboot FullStack CRUD Operations';


   file: any;
  http: any;

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    const formData = new FormData();
    formData.append('file', this.file);

    // Make an HTTP request to your backend server
    this.http.post('http://localhost:3306/employees', formData)
      .subscribe((response: any) => {
        console.log(response);
      }, (error: any) => {
        console.error(error);
      });
  }

}
