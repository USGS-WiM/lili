import { TestBed, inject } from '@angular/core/testing';

import { PcrReplicateService } from './pcr-replicate.service';

describe('PcrReplicateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PcrReplicateService]
    });
  });

  it('should be created', inject([PcrReplicateService], (service: PcrReplicateService) => {
    expect(service).toBeTruthy();
  }));
});
