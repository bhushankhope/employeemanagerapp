import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { Employee } from './components/employees/employees';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee: Employee | null;
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (x: Employee[]) => {
        this.employees = x;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public openModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal')
    if (mode == 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal')
    }
    if (mode == 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal')
    }
    if (mode == 'delete') {
      // this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal')
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddEmployee(form: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(form.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateEmployee(employeeInfo: Employee): void {
    this.employeeService.addEmployee(employeeInfo).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteEmployee(id: number): void {
    if (id === undefined) {
      console.log("Invalid employee ID.");
      return;
  }
    this.employeeService.deleteEmployee(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
