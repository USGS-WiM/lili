import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStudyFilterComponent } from './multi-study-filter.component';

describe('MultiStudyFilterComponent', () => {
  let component: MultiStudyFilterComponent;
  let fixture: ComponentFixture<MultiStudyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiStudyFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStudyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
