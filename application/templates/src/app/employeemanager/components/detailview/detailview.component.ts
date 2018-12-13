import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss']
})
export class DetailviewComponent implements OnInit {
  employee: Employee;
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { 
      
    }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      const id = params['id'];

      this.employeeService.employeesSet.subscribe(emps =>{
        if(emps.length == 0) return;
        this.employee = this.employeeService.employeeById(id);
      });
      
      console.log('employee',this.employee);
    });
  }

  backToHome(){
    this.router.navigate(['employeemanager']);
  }

}
