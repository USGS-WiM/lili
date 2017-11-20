import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentrationTypesComponent } from './concentration-types.component';

describe('ConcentrationTypesComponent', () => {
  let component: ConcentrationTypesComponent;
  let fixture: ComponentFixture<ConcentrationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcentrationTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentrationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
