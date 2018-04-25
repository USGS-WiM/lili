import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTypeFilter } from './record-type-filter.component';

describe('RecordTypeFilter', () => {
  let component: RecordTypeFilter;
  let fixture: ComponentFixture<RecordTypeFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordTypeFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordTypeFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
