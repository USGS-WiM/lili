import { TestBed, inject } from '@angular/core/testing';

import { FinalSampleMeanConcentrationService } from './final-sample-mean-concentration.service';

describe('FinalSampleMeanConcentrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalSampleMeanConcentrationService]
    });
  });

  it('should be created', inject([FinalSampleMeanConcentrationService], (service: FinalSampleMeanConcentrationService) => {
    expect(service).toBeTruthy();
  }));
});
