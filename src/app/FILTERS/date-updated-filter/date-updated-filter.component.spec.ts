import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateUpdatedFilter } from './date-updated-filter.component';

describe('DateUpdatedFilter', () => {
  let component: DateUpdatedFilter;
  let fixture: ComponentFixture<DateUpdatedFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateUpdatedFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateUpdatedFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
