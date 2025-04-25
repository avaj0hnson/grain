import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFormPanelComponent } from './entry-form-panel.component';

describe('EntryFormPanelComponent', () => {
  let component: EntryFormPanelComponent;
  let fixture: ComponentFixture<EntryFormPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryFormPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryFormPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
