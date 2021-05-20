import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getEmployeeList() {
    return this.http.get(this.baseUrl + 'employeepayroll');
  }

  addEmployee(data: any) {
    return this.http.post(this.baseUrl + 'employeepayroll/create', data);
  }

  deleteEmployee(id: any) {
    return this.http.delete(this.baseUrl + 'employeepayroll/delete/' + id);
  }

  updateEmployee(id: any, data: any) {
    return this.http.put(this.baseUrl + 'employeepayroll/update/' + id, data);
  }
}
