import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { IncomeService } from '../../services/income.service';
import { Expense } from '../../models/expense.model';
import { Income } from '../../models/income.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  incomes: Income[] = [];
  totalExpense = 0;
  totalIncome = 0;
  netIncome = 0;

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.expenseService.getAllExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.calculateTotals();
    });

    this.incomeService.getAllIncomes().subscribe(incomes => {
      this.incomes = incomes;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.totalExpense = this.expenses.reduce((sum, e) => sum + e.amount, 0);
    this.totalIncome = this.incomes.reduce((sum, i) => sum + i.amount, 0);
    this.netIncome = this.totalIncome - this.totalExpense;
  }
}
