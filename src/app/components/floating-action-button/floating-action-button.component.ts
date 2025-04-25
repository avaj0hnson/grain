import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-action-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-action-button.component.html',
  styleUrl: './floating-action-button.component.scss'
})
export class FloatingActionButtonComponent {
  @Input() tooltip = 'Add';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
