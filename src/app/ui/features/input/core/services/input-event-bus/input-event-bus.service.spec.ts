import { TestBed } from '@angular/core/testing';

import { InputEventBusService } from './input-event-bus.service';
import {InputModule} from "../../../input.module";

describe('InputEventBusService', () => {
  let service: InputEventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [InputModule]});
    service = TestBed.inject(InputEventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
