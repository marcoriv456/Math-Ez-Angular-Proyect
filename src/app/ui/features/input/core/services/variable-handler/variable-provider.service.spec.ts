import { TestBed } from '@angular/core/testing';

import { VariableHandlerService } from './variable-handler.service';
import { InputModule } from '../../../input.module';

describe('VariableProviderService', () => {
  let service: VariableHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [InputModule] });
    service = TestBed.inject(VariableHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
