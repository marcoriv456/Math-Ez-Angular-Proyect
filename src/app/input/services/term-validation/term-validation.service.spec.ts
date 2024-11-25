import { TestBed } from '@angular/core/testing';

import { TermValidationService } from './term-validation.service';

describe('CharValidationService', () => {
  let service: TermValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
