import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Employee } from '../employee';
import { Router } from 'express';


@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrl: './all-files.component.css'
})
export class AllFilesComponent implements OnInit{

  files: any = [];
  

 

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getFiles();
  }


  getFiles(): void {
    this.employeeService.getFiles().subscribe(
      (response: any[]) => {
        response.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.data;
          this.files.push(element);
        });
      },
      error => {
        console.error('Error fetching files:', error);
      }
    );
  }
  

  // getFiles(): void {
  //   this.employeeService.getFiles().subscribe(
  //     (response: File[]) => {
  //       const processedFiles = response.map((file) => ({
  //        ...file,
  //         processedImg: `data:image/jpeg;base64,${this.files}`,
  //       }));
  //       this.files.push(...processedFiles);
  //     },
  //     (error) => {
  //       throw new Error(`Error fetching files: ${error}`);
  //     }
  //   );
  // }


  downloadFile(fileId: number): void {
    this.employeeService.downloadFile(fileId).subscribe((response: HttpResponse<any>) => {
      const fileNameFromUrl = "file";
      
      if (fileNameFromUrl) {
        const contentType = response.headers.get("Content-Type");
        //const blob = new Blob;
        const blob = new Blob([response.body], { type: contentType || 'application/octet-stream'});
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileNameFromUrl;

        link.click();

        window.URL.revokeObjectURL(link.href);
        link.remove();
      } else{
        console.log("Unable to extract file")
      }
      
    })
  }


  // downloadImage(): void {
  //   this.employeeService.downloadImage('filename').subscribe((response: any) => {
  //     const blob = new Blob([response], { type: 'image/png' });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'filename';
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   });
  // }


  // public downloadFile(id: string): void {
  //   this.employeeService.downloadFile(id).subscribe((blob: Blob) => {
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'file.txt';
  //     a.click();
  //   });
  // }

  



}
