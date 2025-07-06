import {Component} from '@angular/core';
import {routeTransitionAnimations} from "./ui/shared/animations/route-transitions.animation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeTransitionAnimations]
})
export class AppComponent {

}
