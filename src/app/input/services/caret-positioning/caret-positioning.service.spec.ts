import { TestBed } from '@angular/core/testing';

import { CaretPositioningService } from './caret-positioning.service';

describe('CaretPositioningService', () => {
  let service: CaretPositioningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaretPositioningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
