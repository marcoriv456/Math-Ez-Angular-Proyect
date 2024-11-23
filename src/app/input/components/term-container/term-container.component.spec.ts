import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermContainerComponent } from './term-container.component';

describe('TermContainerComponent', () => {
  let component: TermContainerComponent;
  let fixture: ComponentFixture<TermContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
