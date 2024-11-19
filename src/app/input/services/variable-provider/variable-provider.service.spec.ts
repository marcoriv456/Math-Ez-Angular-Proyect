import { TestBed } from '@angular/core/testing';

import { VariableProviderService } from './variable-provider.service';

describe('VariableProviderService', () => {
  let service: VariableProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
