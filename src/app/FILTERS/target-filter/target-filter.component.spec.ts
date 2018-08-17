import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetFilter } from './target-filter.component';

describe('TargetFilter', () => {
  let component: TargetFilter;
  let fixture: ComponentFixture<TargetFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
