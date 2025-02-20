import { TestBed } from '@angular/core/testing';

import { WritingHandlerService } from './writing-handler.service';

describe('WritingHandlerService', () => {
  let service: WritingHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WritingHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
