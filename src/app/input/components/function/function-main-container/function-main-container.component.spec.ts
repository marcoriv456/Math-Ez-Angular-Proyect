import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionMainContainerComponent } from './function-main-container.component';

describe('FunctionMainContainerComponent', () => {
  let component: FunctionMainContainerComponent;
  let fixture: ComponentFixture<FunctionMainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionMainContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
