import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisBatchWorksheetComponent } from './analysis-batch-worksheet.component';

describe('AnalysisBatchWorksheet.Component.TsComponent', () => {
  let component: AnalysisBatchWorksheetComponent;
  let fixture: ComponentFixture<AnalysisBatchWorksheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisBatchWorksheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisBatchWorksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
