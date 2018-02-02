import { TestBed, inject } from '@angular/core/testing';

import { AliquotService } from './aliquot.service';

describe('AliquotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AliquotService]
    });
  });

  it('should be created', inject([AliquotService], (service: AliquotService) => {
    expect(service).toBeTruthy();
  }));
});
