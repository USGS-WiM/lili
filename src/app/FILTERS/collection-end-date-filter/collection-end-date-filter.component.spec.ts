import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionEndDateFilter } from './collection-end-date-filter.component';

describe('CollectionEndDateFilter', () => {
  let component: CollectionEndDateFilter;
  let fixture: ComponentFixture<CollectionEndDateFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionEndDateFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionEndDateFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
