import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionPanelComponent } from './introduction-panel.component';

describe('IntroductionPanelComponent', () => {
  let component: IntroductionPanelComponent;
  let fixture: ComponentFixture<IntroductionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroductionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
