import { TestBed } from '@angular/core/testing';

import { DateIdentificationService } from './date-identification.service';

describe('DateIdentificationService', () => {
  let service: DateIdentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateIdentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
