import { TestBed, inject } from '@angular/core/testing';

import { ServerTestService } from './server-test.service';

describe('ServerTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerTestService]
    });
  });

  it('should be created', inject([ServerTestService], (service: ServerTestService) => {
    expect(service).toBeTruthy();
  }));
});
