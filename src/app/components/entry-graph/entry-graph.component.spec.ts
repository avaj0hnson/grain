import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryGraphComponent } from './entry-graph.component';

describe('EntryGraphComponent', () => {
  let component: EntryGraphComponent;
  let fixture: ComponentFixture<EntryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
