import { TestBed, inject } from '@angular/core/testing';

import { ReportFileService } from './report-file.service';

describe('ReportFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportFileService]
    });
  });

  it('should be created', inject([ReportFileService], (service: ReportFileService) => {
    expect(service).toBeTruthy();
  }));
});
