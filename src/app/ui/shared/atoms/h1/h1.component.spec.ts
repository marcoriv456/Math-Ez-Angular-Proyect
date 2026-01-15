import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H1Component } from './h1.component';
import { SharedModule } from '../../shared.module';

describe('H1Component', () => {
  let component: H1Component;
  let fixture: ComponentFixture<H1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(H1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
