import { TestBed } from '@angular/core/testing';

import { MathInputEventBusService } from './math-input-event-bus.service';

describe('MathInputEventBusService', () => {
  let service: MathInputEventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathInputEventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
