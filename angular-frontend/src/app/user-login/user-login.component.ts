import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { LoginuserService } from '../loginuser.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
  export class UserLoginComponent implements OnInit {

  //   employee:Employee = new Employee();
  // router: any;
  //   constructor(private loginuserservice: LoginuserService) { }
  
  //   ngOnInit(): void {
        
  //   }
  
  //   userLogin(){
  //     console.log(this.employee)
  //     this.loginuserservice.loginUser(this.employee).subscribe(data=>{
  //       alert("Login Successfully")
  //       this.router.navigate(['/employee-details'])
  //     }, error=>alert("sorry please enter correct Userid and Password"));
  //   }


  employee: Employee = new Employee();

  constructor(private loginuserservice: LoginuserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Initialization logic if any can be added here
  }

  userLogin(): void {
    console.log(this.employee);
    this.loginuserservice.loginUser(this.employee).subscribe(
      data => {
        alert("Login Successfully");
        this.router.navigate(['/employees']);
      },
      error => {
        console.error("Error during login:", error);
        alert("Sorry, please enter correct User ID and Password");
      }
    );
  }
  employeeDetails(id: number){
    this.router.navigate(['employee-details', id])
  }
    

}
