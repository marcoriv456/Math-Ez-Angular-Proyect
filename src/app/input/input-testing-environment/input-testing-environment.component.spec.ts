import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTestingEnvironmentComponent } from './input-testing-environment.component';

describe('InputTestingEnvironmentComponent', () => {
  let component: InputTestingEnvironmentComponent;
  let fixture: ComponentFixture<InputTestingEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTestingEnvironmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTestingEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
