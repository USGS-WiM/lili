import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeFilter } from './range-filter.component';

describe('RangeFilter', () => {
  let component: RangeFilter;
  let fixture: ComponentFixture<RangeFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
