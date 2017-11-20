import { TestBed, inject } from '@angular/core/testing';
import { ControlTypeService } from '../control-types/control-types.service';

describe('ControlTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlTypeService]
    });
  });

  it('should be created', inject([ControlTypeService], (service: ControlTypeService) => {
    expect(service).toBeTruthy();
  }));
});
