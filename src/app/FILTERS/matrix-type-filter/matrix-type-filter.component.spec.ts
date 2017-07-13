import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixTypeFilter } from './matrix-type-filter.component';

describe('MatrixTypeFilter', () => {
  let component: MatrixTypeFilter;
  let fixture: ComponentFixture<MatrixTypeFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixTypeFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixTypeFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
