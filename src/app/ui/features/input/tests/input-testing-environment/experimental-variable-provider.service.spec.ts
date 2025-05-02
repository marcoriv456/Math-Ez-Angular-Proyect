import { TestBed } from '@angular/core/testing';

import { ExperimentalVariableProviderService } from './experimental-variable-provider.service';

describe('ExperimentalVariableProviderService', () => {
  let service: ExperimentalVariableProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperimentalVariableProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
