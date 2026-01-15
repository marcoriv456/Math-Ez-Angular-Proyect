import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteMathComponent } from './discrete-math.component';

describe('DiscreteMathComponent', () => {
  let component: DiscreteMathComponent;
  let fixture: ComponentFixture<DiscreteMathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscreteMathComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscreteMathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
