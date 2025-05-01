import { TestBed } from '@angular/core/testing';

import { CaretHandlerService } from './caret-handler.service';

describe('CaretHandlerService', () => {
  let service: CaretHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaretHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
