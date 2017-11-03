import { TestBed, inject } from '@angular/core/testing';

import { ConcentrationTypeService } from './concentration-types.service';

describe('ConcentrationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcentrationTypeService]
    });
  });

  it('should be created', inject([ConcentrationTypeService], (service: ConcentrationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
