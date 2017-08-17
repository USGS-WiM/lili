import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBornOnDateFilter } from './filter-born-on-date-filter.component';

describe('FilterBornOnDateFilter', () => {
  let component: FilterBornOnDateFilter;
  let fixture: ComponentFixture<FilterBornOnDateFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBornOnDateFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBornOnDateFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
