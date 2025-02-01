import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { AllFilesComponent } from './all-files/all-files.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {path: 'employees', component: EmployeeListComponent},
  {path: 'create-employee', component: CreateEmployeeComponent},
  {path: '', redirectTo: 'employees', pathMatch: 'full'},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent},
  {path: 'employee-details/:id', component: EmployeeDetailsComponent},
  { path: "", component: AllFilesComponent },
  { path: "file", component: UploadFileComponent },
  {path: 'upload_file', component: UploadFileComponent},
  {path: 'files', component:AllFilesComponent},
  {path: "", component: AllFilesComponent},
  {path: "user-login", component: UserLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
