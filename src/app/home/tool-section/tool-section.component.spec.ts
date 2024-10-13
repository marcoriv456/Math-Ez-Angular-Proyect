import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSectionComponent } from './tool-section.component';

describe('ToolSectionComponent', () => {
  let component: ToolSectionComponent;
  let fixture: ComponentFixture<ToolSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
