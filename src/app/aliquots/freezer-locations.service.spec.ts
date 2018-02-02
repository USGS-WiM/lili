import { TestBed, inject } from '@angular/core/testing';

import { FreezerLocationsService } from './freezer-locations.service';

describe('FreezerLocationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreezerLocationsService]
    });
  });

  it('should be created', inject([FreezerLocationsService], (service: FreezerLocationsService) => {
    expect(service).toBeTruthy();
  }));
});
