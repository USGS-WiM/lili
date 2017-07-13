import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplerNameFilter } from './sampler-name-filter.component';

describe('SamplerNameFilter', () => {
  let component: SamplerNameFilter;
  let fixture: ComponentFixture<SamplerNameFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplerNameFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplerNameFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
