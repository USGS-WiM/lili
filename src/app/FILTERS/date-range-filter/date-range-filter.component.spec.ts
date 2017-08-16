import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeFilter } from './date-range-filter.component';

describe('DateRangeFilter', () => {
  let component: DateRangeFilter;
  let fixture: ComponentFixture<DateRangeFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRangeFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
