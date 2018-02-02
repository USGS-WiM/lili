import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleLabelComponent } from './sample-label.component';

describe('AnalysisBatchWorksheet.Component.TsComponent', () => {
  let component: SampleLabelComponent;
  let fixture: ComponentFixture<SampleLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
