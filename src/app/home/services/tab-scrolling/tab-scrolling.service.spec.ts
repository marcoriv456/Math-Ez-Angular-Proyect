import { TestBed } from '@angular/core/testing';

import { TabScrollingService } from './tab-scrolling.service';

describe('TabScrollingService', () => {
  let service: TabScrollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabScrollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
