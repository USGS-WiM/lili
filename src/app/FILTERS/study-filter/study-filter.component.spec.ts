import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFilter } from './study-filter.component';

describe('StudyFilter', () => {
  let component: StudyFilter;
  let fixture: ComponentFixture<StudyFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
