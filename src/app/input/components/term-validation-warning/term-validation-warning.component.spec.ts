import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermValidationWarningComponent } from './term-validation-warning.component';

describe('TermValidationWarningComponent', () => {
  let component: TermValidationWarningComponent;
  let fixture: ComponentFixture<TermValidationWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermValidationWarningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermValidationWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
