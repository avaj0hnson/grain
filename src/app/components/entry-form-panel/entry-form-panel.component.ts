import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-entry-form-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry-form-panel.component.html',
  styleUrl: './entry-form-panel.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate('400ms cubic-bezier(0.22, 1, 0.36, 1)', 
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        )
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)', 
          style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' })
        )
      ])
    ])    
  ]
})
export class EntryFormPanelComponent {
  @Input() title = 'Add New';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
