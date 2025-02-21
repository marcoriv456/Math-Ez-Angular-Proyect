import { TestBed } from '@angular/core/testing';

import { RecognizableFunctionsService } from './recognizable-functions.service';

describe('RecognizableFunctionsService', () => {
  let service: RecognizableFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecognizableFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
