import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixTypesComponent } from './matrix-types.component';

describe('MatrixTypesComponent', () => {
  let component: MatrixTypesComponent;
  let fixture: ComponentFixture<MatrixTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
