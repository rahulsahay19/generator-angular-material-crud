import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   private _employeesSet: BehaviorSubject<Employee[]>;

  private dataStore: {
     employeesSet: Employee[]
  }

  //this will allow components to subscribe to this behavior subject
  constructor(private http: HttpClient) { 
    this.dataStore = { employeesSet:[] };
    this._employeesSet = new BehaviorSubject<Employee[]>([]);
  }


  get employeesSet(): Observable<Employee[]>{
    return this._employeesSet.asObservable();
  }

 
  getJSON() {
    return this.http.get<Employee[]>("assets/employeeData.json")
    .subscribe(data =>{
          this.dataStore.employeesSet = data;
          this._employeesSet.next(Object.assign({}, this.dataStore).employeesSet);
      }), catchError(error => {
          return throwError('Unable to fetch employees set!');
});

}

employeeById(id : number){
  return this.dataStore.employeesSet.find(x=>x.id == id);
}

  addEmployee(empl:Employee): Promise<Employee>{
    return new Promise((resolver,reject) =>{
      empl.id = this.dataStore.employeesSet.length + 1;
      this.dataStore.employeesSet.push(empl);
      this._employeesSet.next(Object.assign({}, this.dataStore).employeesSet);
      resolver(empl);
    });
  }

  update(index:number, empl: Employee): Promise<Employee> {
    return new Promise((resolver,reject) =>{
          this.dataStore.employeesSet[index] = empl;
          this._employeesSet.next(Object.assign({}, this.dataStore).employeesSet);
          resolver(empl);      
    })
    
  }

  deleteEmployee(index:number){
    this.dataStore.employeesSet.splice(index,1);
  }
}
