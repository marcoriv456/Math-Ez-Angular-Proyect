import { TestBed } from '@angular/core/testing';

import { WarningsService } from './warnings.service';

describe('WarningsService', () => {
  let service: WarningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[WarningsService]});
    service = TestBed.inject(WarningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initialized the showWarning emitter', () => {
    expect(service.showWarning).toBeTruthy()
  });

  it('should have initialized the hideWarning emitter', () => {
    expect(service.hideWarning).toBeTruthy()
  });
});
