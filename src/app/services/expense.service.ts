import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [
    {
      id: 1,
      title: 'Grocery Run',
      amount: 55.23,
      date: '2024-04-21',
      category: 'Groceries',
      description: 'Trader Joe’s groceries'
    },
    {
      id: 2,
      title: 'Netflix',
      amount: 15.99,
      date: '2024-04-20',
      category: 'Subscriptions',
      description: 'Monthly Netflix plan'
    },
    {
      id: 3,
      title: 'Uber Ride',
      amount: 12.75,
      date: '2024-04-19',
      category: 'Auto & Transport',
      description: 'To downtown'
    }
  ];

  constructor() { }

  postExpense(expenseDTO: Expense): Observable<{ success: boolean; message: string }> {
    console.log('Mock post:', expenseDTO);
    // Add to temp storage
    const newId = Math.max(...this.expenses.map(e => e.id), 0) + 1;
    this.expenses.push({ ...expenseDTO, id: newId });
    return of({ success: true, message: 'Mocked expense posted successfully!' });
  }

  getAllExpenses(): Observable<Expense[]> {
    console.log('Mock get all expenses');
    return of(this.expenses);
  }

  getExpenseById(id: number): Observable<Expense | undefined> {
    console.log(`Mock get expense by id: ${id}`);
    const expense = this.expenses.find(e => e.id === id);
    return of(expense);
  }

  deleteExpense(id: number): Observable<{ success: boolean; message: string }> {
    console.log(`Mock delete expense id: ${id}`);
    const initialLength = this.expenses.length;
    this.expenses = this.expenses.filter(e => e.id !== id);
    const success = this.expenses.length < initialLength;
    return of({
      success,
      message: success ? 'Expense deleted successfully!' : 'Expense not found.'
    });
  }

  updateExpense(updatedExpense: Expense): Observable<{ success: boolean; message: string }> {
    console.log('Mock update expense:', updatedExpense);
    
    const index = this.expenses.findIndex(e => e.id === updatedExpense.id);
    if (index !== -1) {
      this.expenses[index] = { ...updatedExpense };
      return of({ success: true, message: 'Expense updated successfully!' });
    } else {
      return of({ success: false, message: 'Expense not found.' });
    }
  }
}
