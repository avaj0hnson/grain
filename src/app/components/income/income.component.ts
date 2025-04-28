import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntryTableComponent } from '../entry-table/entry-table.component';
import { EntryPieChartComponent } from '../entry-pie-chart/entry-pie-chart.component';
import { EntryGraphComponent } from '../entry-graph/entry-graph.component';
import { ToastService } from '../../services/toast.service';
import { IncomeService } from '../../services/income.service';
import { IncomeCategory } from '../../constants/income-category';
import { Income } from '../../models/income.model';
import { trigger, style, animate, transition } from '@angular/animations';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { TabSelectorComponent } from "../tab-selector/tab-selector.component";
import { FloatingActionButtonComponent } from "../floating-action-button/floating-action-button.component";
import { EntryFormPanelComponent } from "../entry-form-panel/entry-form-panel.component";

@Component({
  standalone: true,
  selector: 'app-income',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntryTableComponent,
    EntryPieChartComponent,
    EntryGraphComponent,
    EntryFormComponent,
    TabSelectorComponent,
    FloatingActionButtonComponent,
    EntryFormPanelComponent
],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
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
export class IncomeComponent implements OnInit {
  incomes: Income[] = [];
  incomeForm!: FormGroup;
  listOfCategory = Object.values(IncomeCategory);
  selectedIncomeId: number | null = null;
  formVisible = false;
  currentTab: 'table' | 'chart' | 'graph' = 'table';

  constructor(
    private fb: FormBuilder,
    private incomeService: IncomeService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getAllIncomes();
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [this.getToday(), Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  getAllIncomes() {
    this.incomeService.getAllIncomes().subscribe(res => {
      this.incomes = res;
    });
  }

  showAddForm() {
    this.incomeForm.reset({ date: this.getToday() });
    this.selectedIncomeId = null;
    this.formVisible = true;

    if(this.currentTab == 'graph')
    {
      this.currentTab = 'table';
      setTimeout(() => {
        this.currentTab = 'graph';
      }, 0);
    }
  }

  selectIncome(income: Income) {
    this.incomeForm.patchValue({
      title: income.title,
      amount: income.amount,
      date: income.date,
      category: income.category,
      description: income.description
    });
    this.selectedIncomeId = income.id;
    this.formVisible = true;
  }

  submitForm() {
    if (this.incomeForm.invalid) return;

    const incomeAction = this.selectedIncomeId
      ? this.incomeService.updateIncome({
          id: this.selectedIncomeId,
          ...this.incomeForm.value
        })
      : this.incomeService.postIncome(this.incomeForm.value);

    incomeAction.subscribe({
      next: () => {
        this.toast.success(this.selectedIncomeId ? 'Income updated!' : 'Income posted!');
        this.incomeForm.reset();
        this.selectedIncomeId = null;
        this.formVisible = false;
        this.getAllIncomes();
      },
      error: () => {
        this.toast.error('Something went wrong.');
      }
    });
  }

  deleteIncome(id: number) {
    if (confirm('Are you sure you want to delete this income?')) {
      this.incomeService.deleteIncome(id).subscribe({
        next: () => {
          this.toast.success('Income deleted successfully!');
          this.getAllIncomes();
        },
        error: () => {
          this.toast.error('Failed to delete income.');
        }
      });
    }
  }

  closeForm() {
    this.formVisible = false;
    this.selectedIncomeId = null;
    this.incomeForm.reset({ date: this.getToday() });
  }
}
