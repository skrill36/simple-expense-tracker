import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getExpenseData(): Observable<any> {
    const url1 = `${this.apiUrl + '/getAll'}`;
    return this.http.get(url1);
  }

  addExpenseData(jsonData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const url1 = `${this.apiUrl + '/addExpense'}`;
    return this.http.post<any>(url1, jsonData, httpOptions);
  }

  updateExpenseData(jsonData: any, id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const url1 = `${this.apiUrl + '/updateById/' + id}`;
    return this.http.post<any>(url1, jsonData, httpOptions);
  }

  deleteExpenseData(id: number) {
    const url1 = `${this.apiUrl + '/deleteById/' + id}`;
    return this.http.delete<any>(url1);
  }

  deleteAllExpensesData() {
    const url1 = `${this.apiUrl + '/deleteAll'}`;
    return this.http.delete<any>(url1);
  }
}
