import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathInputTestPageComponent } from './math-input-test-page.component';

describe('MathInputTestPageComponent', () => {
  let component: MathInputTestPageComponent;
  let fixture: ComponentFixture<MathInputTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MathInputTestPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathInputTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
