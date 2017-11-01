import { TestBed, inject } from '@angular/core/testing';

import { ConcentrationTypesService } from './concentration-types.service';

describe('ConcentrationTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcentrationTypesService]
    });
  });

  it('should be created', inject([ConcentrationTypesService], (service: ConcentrationTypesService) => {
    expect(service).toBeTruthy();
  }));
});
