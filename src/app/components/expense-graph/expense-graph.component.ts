import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../models/expense.model';

@Component({
    standalone: true,
    selector: 'app-expense-graph',
    imports: [CommonModule],
    templateUrl: './expense-graph.component.html'
})
export class ExpenseGraphComponent {
  @Input() expenses: Expense[] = [];
}
