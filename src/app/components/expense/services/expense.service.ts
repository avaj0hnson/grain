import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from '../../../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { }

  postExpense(expenseDTO: Expense): Observable<{ success: boolean; message: string }> {
    console.log('Mock post:', expenseDTO);
    return of({ success: true, message: 'Mocked expense posted successfully!' });
  }

  getAllExpenses(): Observable<Expense[]> {
    console.log('Mock get all expenses');

    const mockExpenses: Expense[] = [
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

    return of(mockExpenses);
  }
}
