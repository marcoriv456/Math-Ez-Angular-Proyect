import {TestBed} from '@angular/core/testing';

import {GlobalEventBusService} from './global-event-bus.service';
import {FooterIntersectedEvent} from "../../models/events/footer-intersected.event";
import {Observable} from "rxjs";

describe('GlobalEventBusService', () => {
  let service: GlobalEventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalEventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`Returns an observable which can be used to listen to a determined type of events`, () => {
    const observer = jest.fn()

    service.on(FooterIntersectedEvent).subscribe(observer)
    service.emit(new FooterIntersectedEvent(false))

    expect(observer).toHaveBeenCalledWith(expect.any(Observable));
  });

});
