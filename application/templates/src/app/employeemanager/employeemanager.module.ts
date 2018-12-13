import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeemanagerAppComponent } from './employeemanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EmployeeManagerRoutingModule } from './employeemanager-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NewEmployeeDialogComponent } from './components/new-employee-dialog/new-employee-dialog.component';
import { DetailviewComponent } from './components/detailview/detailview.component';
import { NotesComponent } from './components/notes/notes.component';
import { EditEmployeeDialogComponent } from './components/edit-employee-dialog/edit-employee-dialog.component';

@NgModule({
  declarations: [
    EmployeemanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NewEmployeeDialogComponent,
    DetailviewComponent,
    NotesComponent,
    EditEmployeeDialogComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    EmployeeManagerRoutingModule
  ],
  entryComponents: [NewEmployeeDialogComponent, EditEmployeeDialogComponent]
})
export class EmployeemanagerModule { }
