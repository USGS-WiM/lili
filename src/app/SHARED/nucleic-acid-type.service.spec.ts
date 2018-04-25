import { TestBed, inject } from '@angular/core/testing';

import { NucleicAcidTypeService } from './nucleic-acid-type.service';

describe('NucleicAcidTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NucleicAcidTypeService]
    });
  });

  it('should be created', inject([NucleicAcidTypeService], (service: NucleicAcidTypeService) => {
    expect(service).toBeTruthy();
  }));
});
