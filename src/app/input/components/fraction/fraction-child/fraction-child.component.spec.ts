import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionChildComponent } from './fraction-child.component';

describe('NumeratorComponent', () => {
  let component: FractionChildComponent;
  let fixture: ComponentFixture<FractionChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FractionChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FractionChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
