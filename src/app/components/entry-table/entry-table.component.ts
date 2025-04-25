import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entry } from '../../models/entry.model';

@Component({
  standalone: true,
  selector: 'app-entry-table',
  imports: [CommonModule],
  templateUrl: './entry-table.component.html',
  styleUrl: './entry-table.component.scss'
})
export class EntryTableComponent {
  @Input() entries: Entry[] = [];
  @Input() title = 'Recent Records';
  @Input() maxRows = 5;

  @Output() rowClicked = new EventEmitter<Entry>();
  @Output() delete = new EventEmitter<number>();

  onRowClick(entry: Entry) {
    this.rowClicked.emit(entry);
  }

  deleteRecord(id: number) {
    this.delete.emit(id);
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'Groceries':
        return 'bg-green-100 text-green-800';
      case 'Subscriptions':
        return 'bg-blue-100 text-blue-800';
      case 'Auto & Transport':
        return 'bg-yellow-100 text-yellow-800';
      case 'Entertainment':
        return 'bg-purple-100 text-purple-800';
      case 'Utilities':
        return 'bg-indigo-100 text-indigo-800';
      case 'Dining':
        return 'bg-pink-100 text-pink-800';
      case 'Salary':
        return 'bg-green-200 text-green-900';
      case 'Investments':
        return 'bg-blue-200 text-blue-900';
      case 'BankTransfer':
        return 'bg-yellow-200 text-yellow-900';
      case 'Other':
        return 'bg-gray-200 text-gray-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
