import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path: '', component: EmployeeFormComponent},
  {path: 'dashboard',component:HomeComponent},
  {path: 'update',component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
