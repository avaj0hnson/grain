import { Routes } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { IncomeComponent } from './components/income/income.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "expense", component: ExpenseComponent },
    { path: "income", component: IncomeComponent }
];
