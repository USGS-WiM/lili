import { TestBed, inject } from '@angular/core/testing';

import { PcrReplicateBatchService } from './pcr-replicate-batch.service';

describe('PcrReplicateBatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PcrReplicateBatchService]
    });
  });

  it('should be created', inject([PcrReplicateBatchService], (service: PcrReplicateBatchService) => {
    expect(service).toBeTruthy();
  }));
});
