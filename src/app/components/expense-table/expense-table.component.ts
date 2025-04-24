import { Component, Input } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-expense-table',
    imports: [CommonModule],
    templateUrl: './expense-table.component.html',
    styleUrl: './expense-table.component.scss'
})
export class ExpenseTableComponent {
  @Input() expenses: Expense[] = [];
}
