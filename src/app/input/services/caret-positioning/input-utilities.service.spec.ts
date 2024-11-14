import { TestBed } from '@angular/core/testing';

import { InputUtilitiesService } from './input-utilities.service';

describe('CaretPositioningService', () => {
  let service: InputUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
