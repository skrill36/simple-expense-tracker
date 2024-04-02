import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface ExpenseElement {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  amount: number | undefined;
  date: Date | undefined;
}

const ELEMENT_DATA: ExpenseElement[] = [];

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css'],
  providers: [DatePipe],
})
export class ExpensesListComponent implements OnInit {
  responseData: any;
  expense: Expense[] = [];

  displayedColumns: string[] = [
    'date',
    'name',
    'description',
    'amount',
    'actions',
  ];
  dataToDisplay = [...ELEMENT_DATA];
  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
    this.router.navigate(['/addexpense']);
  }

  deleteAllData() {
    this.expenseService.deleteAllExpensesData().subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.error('Error sending POST request:', error);
      }
    );
    this.router.navigate(['/']);
  }

  editData(data: any) {
    this.router.navigate(['/editexpense'], {
      queryParams: {
        id: data.id,
        name: data.name,
        description: data.description,
        amount: data.amount,
        date: this.datePipe.transform(data.date, 'yyyy-MM-dd'),
      },
    });
  }

  deleteData(data: any) {
    console.log('The delete comp data is==>', data);
    this.expenseService.deleteExpenseData(data.id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.error('Error sending POST request:', error);
      }
    );
    this.router.navigate(['/']);
  }

  constructor(
    private es: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.es.getExpenseData().subscribe(
      (data) => {
        this.responseData = data;
        this.dataSource = this.responseData;
        console.log('The data for the init service is :--', this.responseData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}

class ExampleDataSource extends DataSource<ExpenseElement> {
  private _dataStream = new ReplaySubject<ExpenseElement[]>();

  constructor(initialData: ExpenseElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<ExpenseElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: ExpenseElement[]) {
    this._dataStream.next(data);
  }
}
