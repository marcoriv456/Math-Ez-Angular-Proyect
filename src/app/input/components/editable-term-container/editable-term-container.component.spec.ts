import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditableTermContainerComponent} from './editable-term-container.component';

describe('EditableTermContainerComponent', () => {
  let component: EditableTermContainerComponent;
  let fixture: ComponentFixture<EditableTermContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditableTermContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableTermContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
