import { TestBed } from '@angular/core/testing';

import { ViewportIntersectionService } from './viewport-intersection.service';

describe('IntersectorServiceService', () => {
  let service: ViewportIntersectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewportIntersectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
