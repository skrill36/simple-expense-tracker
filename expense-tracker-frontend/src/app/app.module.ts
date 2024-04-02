import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { MatIconModule } from '@angular/material/icon';

const routers: Routes = [
  { path: 'expenses', component: ExpensesListComponent },
  { path: 'addexpense', component: AddExpenseComponent },
  { path: 'editexpense', component: EditExpenseComponent },
  { path: '', redirectTo: '/expenses', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ExpensesListComponent,
    NavbarComponent,
    AddExpenseComponent,
    EditExpenseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routers),
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
