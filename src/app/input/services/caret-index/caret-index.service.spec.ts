import { TestBed } from '@angular/core/testing';

import { CaretIndexService } from './caret-index.service';

describe('CaretIndexService', () => {
  let service: CaretIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaretIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
