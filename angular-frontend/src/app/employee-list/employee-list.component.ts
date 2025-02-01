import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit{
  title = 'Welcome to Angular + Springboot FullStack App ';

files: any = [];


  employees: Employee[] | undefined;

  constructor(private employeeService: EmployeeService,
     private router: Router, private http: HttpClient) { }

     name: string = '';
     file: any;
  getName(name: string){
    this.name = name;
  }

  getFiles(event: any){
    this.file = event.target.files[0];
    console.log('file', this.file);
  }

  submitData(){
    let formData = new FormData();
    formData.set('name', this.name);
    formData.set('file', this.file);

    this.http
      .post('http://localhost:3306/api/v1/emloyees', formData)
      .subscribe((response) => {});
  }

  ngOnInit(): void {
    this.getEmployees(); 
  }

  private getEmployees(){
    this.employeeService.getEmployeeList().subscribe(data => {
       this.employees = data;});
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id])
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }

  allFiles(id: number){
    this.router.navigate(['/files'])
  }
  downloadFile(id: number) {
    this.router.navigate(['/download/', id])
    
    }

}
 