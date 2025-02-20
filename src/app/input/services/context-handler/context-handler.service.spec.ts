import { TestBed } from '@angular/core/testing';

import { ContextHandlerService } from './context-handler.service';

describe('ContextHandlerService', () => {
  let service: ContextHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
