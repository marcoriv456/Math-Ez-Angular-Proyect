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

  it('should have some defaul variable initialized', () => {
    expect(service.variables).toBeTruthy()
  });

  it('should return its variable names', () => {
    expect(service.variableNames).toEqual(['A','B','C'])
  });
  it('should return its variable values', () => {
    expect(service.getVariable('A')).toEqual(service.variables.get('A'))
    expect(service.getVariable('B')).toEqual(service.variables.get('B'))
    expect(service.getVariable('C')).toEqual(service.variables.get('C'))
  });
});
