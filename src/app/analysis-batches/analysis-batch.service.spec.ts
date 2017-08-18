import { TestBed, inject } from '@angular/core/testing';

import { AnalysisBatchService } from './analysis-batch.service';

describe('AnalysisBatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalysisBatchService]
    });
  });

  it('should be created', inject([AnalysisBatchService], (service: AnalysisBatchService) => {
    expect(service).toBeTruthy();
  }));
});
