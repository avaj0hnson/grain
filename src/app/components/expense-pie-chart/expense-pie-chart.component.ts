import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../models/expense.model';

@Component({
    standalone: true,
    selector: 'app-expense-pie-chart',
    imports: [CommonModule],
    templateUrl: './expense-pie-chart.component.html'
})
export class ExpensePieChartComponent {
  @Input() expenses: Expense[] = [];
}
