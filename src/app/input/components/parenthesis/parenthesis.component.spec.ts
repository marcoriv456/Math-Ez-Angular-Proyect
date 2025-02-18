import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParenthesisComponent} from './parenthesis.component';

describe('ParenthesisComponent', () => {
  let component: ParenthesisComponent;
  let fixture: ComponentFixture<ParenthesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParenthesisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParenthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
