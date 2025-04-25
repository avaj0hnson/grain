import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Entry } from '../../models/entry.model';

@Component({
  selector: 'app-entry-pie-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './entry-pie-chart.component.html'
})
export class EntryPieChartComponent implements OnChanges {
  @Input() entries: Entry[] = [];
  @Input() chartTitle = 'Spending by Category';
  @Input() maxCategories = 5;

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }]
  };

  public pieChartType: ChartType = 'pie';

  ngOnChanges(): void {
    if (!this.entries?.length) return;

    const grouped: { [key: string]: number } = {};

    for (let e of this.entries) {
      grouped[e.category] = (grouped[e.category] || 0) + e.amount;
    }

    const topCategories = Object.entries(grouped)
      .sort(([, a], [, b]) => b - a)
      .slice(0, this.maxCategories);

    this.pieChartData.labels = topCategories.map(([category]) => category);
    this.pieChartData.datasets[0].data = topCategories.map(([, amount]) => amount);
  }
}
