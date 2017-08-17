import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionStartDateFilter } from './collection-start-date-filter.component';

describe('CollectionStartDateFilter', () => {
  let component: CollectionStartDateFilter;
  let fixture: ComponentFixture<CollectionStartDateFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionStartDateFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionStartDateFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
