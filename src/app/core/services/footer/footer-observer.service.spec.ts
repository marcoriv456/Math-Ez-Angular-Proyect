import { TestBed } from '@angular/core/testing';

import { FooterObserverService } from './footer-observer.service';

describe('FooterObserverService', () => {
  let service: FooterObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
