import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTypesComponent } from './filter-types.component';

describe('FilterTypesComponent', () => {
  let component: FilterTypesComponent;
  let fixture: ComponentFixture<FilterTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
