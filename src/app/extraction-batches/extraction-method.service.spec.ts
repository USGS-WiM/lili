import { TestBed, inject } from '@angular/core/testing';

import { ExtractionMethodService } from './extraction-method.service';

describe('ExtractionMethodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtractionMethodService]
    });
  });

  it('should be created', inject([ExtractionMethodService], (service: ExtractionMethodService) => {
    expect(service).toBeTruthy();
  }));
});
