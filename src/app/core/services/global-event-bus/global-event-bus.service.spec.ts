import {TestBed} from '@angular/core/testing';

import {GlobalEventBusService} from './global-event-bus.service';

describe('GlobalEventBusService', () => {
  let service: GlobalEventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalEventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
