import { TestBed, inject } from '@angular/core/testing';

import { ReportTypesService } from './report-types.service';

describe('ReportTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTypesService]
    });
  });

  it('should be created', inject([ReportTypesService], (service: ReportTypesService) => {
    expect(service).toBeTruthy();
  }));
});
