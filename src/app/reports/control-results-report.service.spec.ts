import { TestBed, inject } from '@angular/core/testing';

import { ControlResultsReportService } from './control-results-report.service';

describe('ControlResultsReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlResultsReportService]
    });
  });

  it('should be created', inject([ControlResultsReportService], (service: ControlResultsReportService) => {
    expect(service).toBeTruthy();
  }));
});
