import {animate, style, transition, trigger} from "@angular/animations";

export const warningAdviceAnimation = trigger('warning-animations',[
  transition(':enter',[
    style({transform:'translateY(-100%)',opacity:0}),
    animate('500ms cubic-bezier(0,0,0,1)',style({transform:'translateY(0)',opacity:1}))
  ]),
  transition(':leave',[
    animate('500ms cubic-bezier(0,0,0,1)',style({transform:'translateY(-100%)',opacity:0}))
  ]),

])
