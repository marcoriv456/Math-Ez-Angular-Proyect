import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPanelFeatureComponent } from './tool-panel-feature.component';

describe('ToolPanelFeatureComponent', () => {
  let component: ToolPanelFeatureComponent;
  let fixture: ComponentFixture<ToolPanelFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolPanelFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolPanelFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
