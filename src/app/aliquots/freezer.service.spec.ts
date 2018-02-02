import { TestBed, inject } from '@angular/core/testing';

import { FreezerService } from './freezer.service';

describe('FreezerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreezerService]
    });
  });

  it('should be created', inject([FreezerService], (service: FreezerService) => {
    expect(service).toBeTruthy();
  }));
});
