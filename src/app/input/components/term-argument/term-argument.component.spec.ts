import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermArgumentComponent } from './term-argument.component';

describe('TermArgumentComponent', () => {
  let component: TermArgumentComponent;
  let fixture: ComponentFixture<TermArgumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermArgumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermArgumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
