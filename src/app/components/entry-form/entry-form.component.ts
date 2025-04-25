import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.scss'
})
export class EntryFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() listOfCategory: string[] = [];
  @Input() isEditing = false;
  @Input() submitButtonText = 'Submit';
  
  @Output() submitted = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitted.emit();
    }
  }

  onCancel() {
    this.cancelled.emit();
  }
}
