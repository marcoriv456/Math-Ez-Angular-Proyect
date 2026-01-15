import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCardComponent } from './topic-card.component';
import { CalculatorsModule } from '../../../calculators.module';

describe('TopicCardComponent', () => {
  let component: TopicCardComponent;
  let fixture: ComponentFixture<TopicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the default card color when no color is provided', () => {
    const hostElement = fixture.nativeElement;
    expect(hostElement.style.getPropertyValue('--card-color')).toBe(
      'hsl(200, 100%, 50%)',
    );
  });

  it('should apply the provided card color', () => {
    component.color = 'hsl(100, 50%, 50%)';
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    expect(hostElement.style.getPropertyValue('--card-color')).toBe(
      'hsl(100, 50%, 50%)',
    );
  });
});
