import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominatorComponent } from './denominator.component';

describe('DenominatorComponent', () => {
  let component: DenominatorComponent;
  let fixture: ComponentFixture<DenominatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenominatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenominatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
