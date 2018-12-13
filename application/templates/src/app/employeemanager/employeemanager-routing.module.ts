import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeemanagerAppComponent } from './employeemanager-app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { DetailviewComponent } from './components/detailview/detailview.component';


const routes: Routes = [
    { path:'', component: EmployeemanagerAppComponent, 
    children:[
        { path: ':id', component: DetailviewComponent },
        { path: '', component: MainContentComponent }
    ]    
},
    { path: '**', redirectTo: ''}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagerRoutingModule { }
