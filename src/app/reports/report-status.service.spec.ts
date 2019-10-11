import { TestBed, inject } from '@angular/core/testing';

import { ReportStatusService } from './report-status.service';

describe('ReportStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportStatusService]
    });
  });

  it('should be created', inject([ReportStatusService], (service: ReportStatusService) => {
    expect(service).toBeTruthy();
  }));
});
