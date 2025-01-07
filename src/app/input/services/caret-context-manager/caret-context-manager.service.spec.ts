import { TestBed } from '@angular/core/testing';

import { CaretContextManagerService } from './caret-context-manager.service';

describe('CaretContextManagerService', () => {
  let service: CaretContextManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaretContextManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
