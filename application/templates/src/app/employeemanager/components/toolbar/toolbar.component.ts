import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { NewEmployeeDialogComponent } from '../new-employee-dialog/new-employee-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();
  constructor(private dialog:MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  openEmployeeDialog(){
   let dialogRef =  this.dialog.open(NewEmployeeDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('Dialog closed', result);

      if(result){
        this.openSnackBar("Employee Added", "Navigate")
        .onAction().subscribe(()=>{
          //navigate
          this.router.navigate(['/employeemanager', result.id]);
        });
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
   return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
