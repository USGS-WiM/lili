import { TestBed, inject } from '@angular/core/testing';

import { FinalConcentratedSampleVolumeService } from './final-concentrated-sample-volume.service';

describe('FinalConcentratedSampleVolumeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalConcentratedSampleVolumeService]
    });
  });

  it('should be created', inject([FinalConcentratedSampleVolumeService], (service: FinalConcentratedSampleVolumeService) => {
    expect(service).toBeTruthy();
  }));
});
