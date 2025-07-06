import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const routeTransitionAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({position: 'relative'}),

    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], {optional: true}),

    query(':enter', [
      style({translate: '0 10rem', opacity: 0})
    ], {optional: true}),

    query(':leave', [
      style({translate: '0 0', opacity: 1}),
      animateChild()
    ], {optional: true}),

    group([
      query(':leave', [
        animate('300ms cubic-bezier(0,0,0,1)', style({translate: '0 -10rem', opacity: 0}))
      ], {optional: true}),
      query(':enter', [
        animate('300ms cubic-bezier(0,0,0,1)', style({translate: '0 0', opacity: 1}))
      ], {optional: true})
    ]),

    query(':enter', animateChild(), {optional: true})
  ])
]);
