import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';
import { ExpenseService } from 'src/app/services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  providers: [DatePipe],
})
export class AddExpenseComponent {
  exName: string | undefined;
  exDesc: string | undefined;
  exDate: any = new Date();
  exAmount: number | undefined;

  constructor(
    private datePipe: DatePipe,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.exDate = this.datePipe.transform(this.exDate, 'yyyy-MM-dd');
  }

  submitData() {
    let dataStr = {
      name: this.exName,
      description: this.exDesc,
      amount: this.exAmount,
      date: this.datePipe.transform(this.exDate, 'yyyy-MM-dd'),
    };

    // console.log('The data is ===>', dataStr);

    this.expenseService.addExpenseData(dataStr).subscribe(
      (data) => {
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
