import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisBatchDetailComponent } from './analysis-batch-detail.component';

describe('AnalysisBatchDetailComponent', () => {
  let component: AnalysisBatchDetailComponent;
  let fixture: ComponentFixture<AnalysisBatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisBatchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisBatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
