import { TestBed } from '@angular/core/testing';

import { VariableHandlerService } from './variable-handler.service';

describe('VariableProviderService', () => {
  let service: VariableHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
