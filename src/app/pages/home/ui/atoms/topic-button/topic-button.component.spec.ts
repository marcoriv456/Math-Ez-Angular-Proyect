import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopicButtonComponent} from './topic-button.component';

describe('TopicButtonComponent', () => {
  let component: TopicButtonComponent;
  let fixture: ComponentFixture<TopicButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
