import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { Entry } from '../../models/entry.model';

@Component({
  selector: 'app-entry-graph',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FormsModule],
  templateUrl: './entry-graph.component.html'
})
export class EntryGraphComponent implements OnChanges {
  @Input() entries: Entry[] = [];
  @Input() graphTitle = 'Entries Over Time';
  @Input() maxColors = 10;

  selectedCategory = 'All - Grouped';
  categories: string[] = [];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  private readonly fallbackColors = [
    '#4ade80', '#60a5fa', '#f87171', '#facc15', '#a78bfa',
    '#fb923c', '#34d399', '#f472b6', '#22d3ee', '#c084fc', '#94a3b8'
  ];

  ngOnChanges(): void {
    this.updateCategoryList();
    this.updateChart();
  }

  onCategoryChange(): void {
    this.updateChart();
  }

  private updateCategoryList(): void {
    const uniqueCategories = new Set(this.entries.map(e => e.category));
    this.categories = ['All - Grouped', 'All - Total', ...Array.from(uniqueCategories)];
  }

  private updateChart(): void {
    if (!this.entries.length) return;

    const uniqueDates = new Set<string>();
    const totalByDate: { [date: string]: number } = {};
    const groupedByCategory: { [category: string]: { [date: string]: number } } = {};

    for (const { category, date, amount } of this.entries) {
      uniqueDates.add(date);
      totalByDate[date] = (totalByDate[date] || 0) + amount;

      if (this.selectedCategory === 'All - Grouped' || category === this.selectedCategory) {
        groupedByCategory[category] = groupedByCategory[category] || {};
        groupedByCategory[category][date] = (groupedByCategory[category][date] || 0) + amount;
      }
    }

    const sortedDates = Array.from(uniqueDates).sort();

    this.lineChartData = {
      labels: sortedDates,
      datasets: this.selectedCategory === 'All - Total'
        ? [this.buildTotalDataset(totalByDate, sortedDates)]
        : this.buildGroupedDatasets(groupedByCategory, sortedDates)
    };
  }

  private buildTotalDataset(dataByDate: { [date: string]: number }, dates: string[]) {
    return {
      label: 'Total',
      data: dates.map(date => dataByDate[date] || 0),
      borderColor: '#6366f1',
      backgroundColor: '#a5b4fc',
      tension: 0.3,
      fill: true
    };
  }

  private buildGroupedDatasets(
    grouped: { [category: string]: { [date: string]: number } },
    dates: string[]
  ) {
    return Object.entries(grouped).map(([category, dateMap], i) => {
      const color = this.fallbackColors[i % this.fallbackColors.length];

      return {
        label: category,
        data: dates.map(date => dateMap[date] || 0),
        borderColor: color,
        backgroundColor: color + '33',
        tension: 0.3,
        fill: true
      };
    });
  }
}
