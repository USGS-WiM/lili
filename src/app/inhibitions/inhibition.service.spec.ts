import { TestBed, inject } from '@angular/core/testing';

import { InhibitionService } from './inhibition.service';

describe('InhibitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InhibitionService]
    });
  });

  it('should be created', inject([InhibitionService], (service: InhibitionService) => {
    expect(service).toBeTruthy();
  }));
});
