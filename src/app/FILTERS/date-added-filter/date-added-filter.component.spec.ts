import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAddedFilter} from './date-added-filter.component';

describe('DateAddedFilter', () => {
  let component: DateAddedFilter;
  let fixture: ComponentFixture<DateAddedFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateAddedFilter]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAddedFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
