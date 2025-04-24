import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from './services/expense.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Expense } from '../../models/expense.model';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';
import { ExpensePieChartComponent } from '../expense-pie-chart/expense-pie-chart.component';
import { ExpenseGraphComponent } from '../expense-graph/expense-graph.component';

@Component({
    standalone: true,
    selector: 'app-expense',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ExpenseTableComponent,
        ExpensePieChartComponent,
        ExpenseGraphComponent
    ],
    templateUrl: './expense.component.html',
    styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  currentTab: 'table' | 'chart' | 'graph' = 'table';
  listOfCategory: any[] = [
    "Auto & Transport",
    "Bills & Utilities",
    "Clothing",
    "Dining & Drinks",
    "Entertainment",
    "Groceries",
    "Health & Wellness",
    "Subscriptions",
    "Travel",
    "Other",
    "Personal Care"
  ];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getAllExpenses();
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [this.getToday(), Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  submitForm() {
    console.log("POSTING");
    if (this.expenseForm.invalid) return;
  
    this.expenseService.postExpense(this.expenseForm.value).subscribe({
      next: () => {
        this.toast.success('Expense posted successfully!');
        this.expenseForm.reset();
      },
      error: () => {
        this.toast.error('Something went wrong while posting the expense.');
      }
    });
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().subscribe(res=> {
      this.expenses = res;
      console.log(this.expenses)
    })
  }
}
