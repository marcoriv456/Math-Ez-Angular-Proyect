import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PComponent} from './p.component';
import {SharedModule} from "../../shared.module";

describe('PComponent', () => {
  let component: PComponent;
  let fixture: ComponentFixture<PComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
