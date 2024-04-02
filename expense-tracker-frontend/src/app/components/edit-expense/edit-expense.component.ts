import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css'],
  providers: [DatePipe],
})
export class EditExpenseComponent implements OnInit {
  exName: string | undefined;
  exDesc: string | undefined;
  exDate: Date | undefined;
  exAmount: number | undefined;
  exId!: number | 0;

  constructor(
    private datePipe: DatePipe,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.exId = params['id'];
      this.exName = params['name'];
      this.exDesc = params['description'];
      this.exAmount = params['amount'];
      this.exDate = params['date'];
    });
  }

  updateData() {
    let dataString;
    dataString = {
      name: this.exName,
      description: this.exDesc,
      amount: this.exAmount,
      date: this.datePipe.transform(this.exDate, 'yyyy-MM-dd'),
    };
    console.log('The data is ', dataString, this.exId);

    this.expenseService.updateExpenseData(dataString, this.exId).subscribe(
      (data) => {
        // console.log('The data for the POST request is:', data);
        this.router.navigate(['/expenses']);
      },
      (error) => {
        console.error('Error sending POST request:', error);
      }
    );
  }

  cancelData() {
    this.router.navigate(['/expenses']);
  }
}
