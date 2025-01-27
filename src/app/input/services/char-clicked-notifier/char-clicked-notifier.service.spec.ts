import { TestBed } from '@angular/core/testing';

import { CharClickedNotifierService } from './char-clicked-notifier.service';

describe('CaretPositioningService', () => {
  let service: CharClickedNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[CharClickedNotifierService]});
    service = TestBed.inject(CharClickedNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should initialize its event emitter', () => {
    expect(service.charClicked).toBeTruthy()
  });
});
