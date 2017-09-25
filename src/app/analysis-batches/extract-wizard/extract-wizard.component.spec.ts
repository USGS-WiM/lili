import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractWizardComponent } from './extract-wizard.component';

describe('ExtractWizardComponent', () => {
  let component: ExtractWizardComponent;
  let fixture: ComponentFixture<ExtractWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
