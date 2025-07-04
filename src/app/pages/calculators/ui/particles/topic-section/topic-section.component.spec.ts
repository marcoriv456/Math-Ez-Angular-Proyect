import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopicSectionComponent} from './topic-section.component';

describe('TopicSectionComponent', () => {
  let component: TopicSectionComponent;
  let fixture: ComponentFixture<TopicSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicSectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopicSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
