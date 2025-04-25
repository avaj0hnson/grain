import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-selector.component.html',
  styleUrl: './tab-selector.component.scss'
})
export class TabSelectorComponent {
  @Input() currentTab: 'table' | 'chart' | 'graph' = 'table';
  @Output() tabSelected = new EventEmitter<'table' | 'chart' | 'graph'>();

  selectTab(tab: 'table' | 'chart' | 'graph') {
    this.tabSelected.emit(tab);
  }
}
