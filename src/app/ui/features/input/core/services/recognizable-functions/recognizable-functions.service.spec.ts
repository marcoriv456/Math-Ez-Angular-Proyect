import { TestBed } from '@angular/core/testing';

import { RecognizableFunctionsService } from './recognizable-functions.service';
import { InputModule } from '../../../input.module';

describe('RecognizableFunctionsService', () => {
  let service: RecognizableFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [InputModule] });
    service = TestBed.inject(RecognizableFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
