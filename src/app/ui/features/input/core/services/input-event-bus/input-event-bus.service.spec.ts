import { TestBed } from '@angular/core/testing';

import { InputEventBusService } from './input-event-bus.service';

describe('InputEventBusService', () => {
  let service: InputEventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputEventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
