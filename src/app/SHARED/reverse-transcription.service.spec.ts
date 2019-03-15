import { TestBed, inject } from '@angular/core/testing';

import { ReverseTranscriptionService } from './reverse-transcription.service';

describe('ReverseTranscriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReverseTranscriptionService]
    });
  });

  it('should be created', inject([ReverseTranscriptionService], (service: ReverseTranscriptionService) => {
    expect(service).toBeTruthy();
  }));
});
