import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../components/employees/employees';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<any>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employeeInfo: Employee): any {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employeeInfo);
  }

  public updateEmployee(employeeInfo: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employeeInfo);
  }

  public deleteEmployee(id: number): any {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${id}`);
  }

  // public findAllEmployees(): any {
  //   return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  // }

  // public findEmployeeById(id: Long): any {
  //   return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employeeInfo);
  // }
}
