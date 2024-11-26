import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootMainContainerComponent } from './root-main-container.component';

describe('RootMainContainerComponent', () => {
  let component: RootMainContainerComponent;
  let fixture: ComponentFixture<RootMainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootMainContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
