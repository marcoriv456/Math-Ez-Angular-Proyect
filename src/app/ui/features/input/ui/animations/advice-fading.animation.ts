import { animate, style, transition, trigger } from '@angular/animations';

export const adviceFadingAnimation = trigger('advice-fading', [
  transition(':enter', [
    style({ transform: 'translateY(-10%)', opacity: 0 }),
    animate(
      '500ms cubic-bezier(0,0,0,1)',
      style({ transform: 'translateY(0)', opacity: 1 }),
    ),
  ]),
  transition(':leave', [
    animate(
      '500ms cubic-bezier(0,0,0,1)',
      style({ transform: 'translateY(-10%)', opacity: 0 }),
    ),
  ]),
]);
