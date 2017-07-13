import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTypeFilter } from './filter-type-filter.component';

describe('FilterTypeFilter', () => {
  let component: FilterTypeFilter;
  let fixture: ComponentFixture<FilterTypeFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTypeFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTypeFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
