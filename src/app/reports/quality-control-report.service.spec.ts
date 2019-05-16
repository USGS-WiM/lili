import { TestBed, inject } from '@angular/core/testing';

import { QualityControlReportService } from './quality-control-report.service';

describe('QualityControlReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualityControlReportService]
    });
  });

  it('should be created', inject([QualityControlReportService], (service: QualityControlReportService) => {
    expect(service).toBeTruthy();
  }));
});
