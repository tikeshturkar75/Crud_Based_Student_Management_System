import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {

  selectedFile: File | null = null;
  uploadProgress: number | undefined;

  constructor(private fileUploadService: EmployeeService, private http: HttpClient) { }

  onFileSelected(event: any): void{
    const fileList: FileList = event.target.files;
    if(fileList && fileList.length > 0){
      this.selectedFile = fileList[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile){
      this.fileUploadService.uploadFile(this.selectedFile)
      .subscribe((progress) => {
        this.uploadProgress = progress;
        if (progress === 100){
          alert("File upload completed")
          this.selectedFile = null;
        }
      });
    }
  }

}
