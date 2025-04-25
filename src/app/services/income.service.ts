import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Income } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private incomes: Income[] = [
    {
      id: 1,
      title: 'Bi-weekly Pay',
      amount: 1555.23,
      date: '2024-04-18',
      category: 'Salary',
      description: 'After taxes'
    },
    {
      id: 2,
      title: 'Dividends',
      amount: 15.99,
      date: '2024-04-20',
      category: 'Investments',
      description: 'SCHD ETF'
    },
    {
      id: 3,
      title: 'Venmo',
      amount: 12.75,
      date: '2024-04-19',
      category: 'Bank Transfer',
      description: 'From Brooke'
    }
  ];

  constructor() { }

  postIncome(incomeDTO: Income): Observable<{ success: boolean; message: string }> {
    console.log('Mock post:', incomeDTO);
    // Add to temp storage
    const newId = Math.max(...this.incomes.map(e => e.id), 0) + 1;
    this.incomes.push({ ...incomeDTO, id: newId });
    return of({ success: true, message: 'Mocked income posted successfully!' });
  }

  getAllIncomes(): Observable<Income[]> {
    console.log('Mock get all incomes');
    return of(this.incomes);
  }

  getIncomeById(id: number): Observable<Income | undefined> {
    console.log(`Mock get income by id: ${id}`);
    const income = this.incomes.find(e => e.id === id);
    return of(income);
  }

  deleteIncome(id: number): Observable<{ success: boolean; message: string }> {
    console.log(`Mock delete income id: ${id}`);
    const initialLength = this.incomes.length;
    this.incomes = this.incomes.filter(e => e.id !== id);
    const success = this.incomes.length < initialLength;
    return of({
      success,
      message: success ? 'Income deleted successfully!' : 'Income not found.'
    });
  }

  updateIncome(updatedIncome: Income): Observable<{ success: boolean; message: string }> {
    console.log('Mock update income:', updatedIncome);
    
    const index = this.incomes.findIndex(e => e.id === updatedIncome.id);
    if (index !== -1) {
      this.incomes[index] = { ...updatedIncome };
      return of({ success: true, message: 'Income updated successfully!' });
    } else {
      return of({ success: false, message: 'Income not found.' });
    }
  }
}
