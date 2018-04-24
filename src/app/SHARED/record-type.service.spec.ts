import { TestBed, inject } from '@angular/core/testing';

import { RecordTypeService } from './record-type.service';

describe('RecordTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordTypeService]
    });
  });

  it('should be created', inject([RecordTypeService], (service: RecordTypeService) => {
    expect(service).toBeTruthy();
  }));
});
