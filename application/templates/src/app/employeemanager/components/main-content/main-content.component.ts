import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBarRef, SimpleSnackBar, MatSnackBar, MatDialogConfig } from '@angular/material';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  @Input() employeesData: Observable<Employee[]>;
  employee: Employee;
  constructor(private employeeService: EmployeeService,
     private router: Router,
     private route: ActivatedRoute,
     private dialog:MatDialog,
     private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.employeesData = this.employeeService.employeesSet;
    this.employeeService.getJSON();
    this.employeesData.subscribe(data =>{
      console.log(data);
    });
  }

  __cardClick(emp){
    console.log(emp);
    this.router.navigate(['employeemanager', emp.id]);
  }

  openEmployeeDialog(index:number,{ id, avatar, name, birthDate, bio}:Employee){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "450px";
    dialogConfig.data= {id, avatar, name, birthDate, bio, index};
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
  );
}

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
       duration: 2000,
     });
   }
   
   deleteItem(i:number){
    this.employeeService.deleteEmployee(i);
   }
}
