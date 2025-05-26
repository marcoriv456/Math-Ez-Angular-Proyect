import {Component} from '@angular/core';
import {bgConfig} from "./core/config/bg-config2.config";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected readonly bgConfig = bgConfig;
}
