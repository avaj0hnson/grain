import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryPieChartComponent } from './entry-pie-chart.component';

describe('EntryPieChartComponent', () => {
  let component: EntryPieChartComponent;
  let fixture: ComponentFixture<EntryPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
