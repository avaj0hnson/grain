import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Expense } from '../../models/expense.model';
import { ExpenseCategory } from '../../constants/expense-category';
import { EntryTableComponent } from "../entry-table/entry-table.component";
import { EntryPieChartComponent } from "../entry-pie-chart/entry-pie-chart.component";
import { EntryGraphComponent } from "../entry-graph/entry-graph.component";
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { TabSelectorComponent } from "../tab-selector/tab-selector.component";
import { FloatingActionButtonComponent } from "../floating-action-button/floating-action-button.component";
import { EntryFormPanelComponent } from "../entry-form-panel/entry-form-panel.component";

@Component({
  standalone: true,
  selector: 'app-expense',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntryTableComponent,
    EntryPieChartComponent,
    EntryGraphComponent,
    EntryFormComponent,
    TabSelectorComponent,
    FloatingActionButtonComponent,
    EntryFormPanelComponent
],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  currentTab: 'table' | 'chart' | 'graph' = 'table';
  listOfCategory = Object.values(ExpenseCategory);
  selectedExpenseId: number | null = null;
  formVisible = false;

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
    });
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().subscribe(res => {
      this.expenses = res;
    });
  }

  showAddForm() {
    this.expenseForm.reset({ date: this.getToday() });
    this.selectedExpenseId = null;
    this.formVisible = true;

    if(this.currentTab == 'graph')
    {
      this.currentTab = 'table';
      setTimeout(() => {
        this.currentTab = 'graph';
      }, 0);
    }
  }

  selectExpense(expense: Expense) {
    this.expenseForm.patchValue({
      title: expense.title,
      amount: expense.amount,
      date: expense.date,
      category: expense.category,
      description: expense.description
    });
    this.selectedExpenseId = expense.id;
    this.formVisible = true;
  }

  submitForm() {
    if (this.expenseForm.invalid) return;

    const expenseAction = this.selectedExpenseId
      ? this.expenseService.updateExpense({
          id: this.selectedExpenseId,
          ...this.expenseForm.value
        })
      : this.expenseService.postExpense(this.expenseForm.value);

    expenseAction.subscribe({
      next: () => {
        this.toast.success(this.selectedExpenseId ? 'Expense updated!' : 'Expense posted!');
        this.expenseForm.reset();
        this.selectedExpenseId = null;
        this.formVisible = false;
        this.getAllExpenses();
      },
      error: () => {
        this.toast.error('Something went wrong.');
      }
    });
  }

  deleteExpense(id: number) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe({
        next: () => {
          this.toast.success('Expense deleted successfully!');
          this.getAllExpenses();
        },
        error: () => {
          this.toast.error('Failed to delete expense.');
        }
      });
    }
  }  

  closeForm() {
    this.formVisible = false;
    this.selectedExpenseId = null;
    this.expenseForm.reset({ date: this.getToday() });
  }  
}
