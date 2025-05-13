import { TestBed } from '@angular/core/testing';

import { CaretIndexService } from './caret-index.service';
import {InputModule} from "../../../input.module";

describe('CaretIndexService', () => {
  let service: CaretIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [InputModule]});
    service = TestBed.inject(CaretIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
