import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisBatchesComponent } from './analysis-batches.component';

describe('AnalysisBatchesComponent', () => {
  let component: AnalysisBatchesComponent;
  let fixture: ComponentFixture<AnalysisBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
