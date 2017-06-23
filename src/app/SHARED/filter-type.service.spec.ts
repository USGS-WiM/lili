import { TestBed, inject } from '@angular/core/testing';

import { FilterTypeService } from './filter-type.service';

describe('FilterTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterTypeService]
    });
  });

  it('should ...', inject([FilterTypeService], (service: FilterTypeService) => {
    expect(service).toBeTruthy();
  }));
});
