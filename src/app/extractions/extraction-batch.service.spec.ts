import { TestBed, inject } from '@angular/core/testing';

import { ExtractionBatchService } from './extraction-batch.service';

describe('ExtractionBatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtractionBatchService]
    });
  });

  it('should be created', inject([ExtractionBatchService], (service: ExtractionBatchService) => {
    expect(service).toBeTruthy();
  }));
});
