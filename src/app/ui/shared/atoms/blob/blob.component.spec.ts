import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlobComponent} from './blob.component';
import {SharedModule} from "../../shared.module";

describe('BlobComponent', () => {
  let component: BlobComponent;
  let fixture: ComponentFixture<BlobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should bind the correct position class based on input', () => {
    component.position = 'right-bottom';
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    expect(hostElement.classList).toContain('right-bottom');
  });

  it('should bind the visible class when isVisible is true', () => {
    component.show();
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    expect(hostElement.classList).toContain('visible');
  });

  it('should not bind the visible class when isVisible is false', () => {
    component.hide();
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    expect(hostElement.classList).not.toContain('visible');
  });
});
