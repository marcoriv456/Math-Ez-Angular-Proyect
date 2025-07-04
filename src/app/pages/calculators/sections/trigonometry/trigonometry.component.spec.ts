import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrigonometryComponent} from './trigonometry.component';

describe('TrigonometryComponent', () => {
  let component: TrigonometryComponent;
  let fixture: ComponentFixture<TrigonometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrigonometryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrigonometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
