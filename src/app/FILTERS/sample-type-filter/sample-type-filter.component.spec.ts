import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTypeFilter } from './sample-type-filter.component';

describe('SampleTypeFilter', () => {
  let component: SampleTypeFilter;
  let fixture: ComponentFixture<SampleTypeFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleTypeFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTypeFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
