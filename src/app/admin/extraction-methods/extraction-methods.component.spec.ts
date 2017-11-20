import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractionMethodsComponent } from './extraction-methods.component';

describe('ExtractionMethodsComponent', () => {
  let component: ExtractionMethodsComponent;
  let fixture: ComponentFixture<ExtractionMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractionMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractionMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
