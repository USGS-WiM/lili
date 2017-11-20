import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTypesComponent } from './sample-types.component';

describe('SampleTypesComponent', () => {
  let component: SampleTypesComponent;
  let fixture: ComponentFixture<SampleTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
