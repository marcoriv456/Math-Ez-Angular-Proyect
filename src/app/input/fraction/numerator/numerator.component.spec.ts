import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeratorComponent } from './numerator.component';

describe('NumeratorComponent', () => {
  let component: NumeratorComponent;
  let fixture: ComponentFixture<NumeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumeratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
