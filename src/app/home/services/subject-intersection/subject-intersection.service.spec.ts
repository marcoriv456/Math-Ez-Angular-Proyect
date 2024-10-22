import { TestBed } from '@angular/core/testing';

import { SubjectIntersectionService } from './subject-intersection.service';

describe('SubjectIntersectionService', () => {
  let service: SubjectIntersectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectIntersectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
