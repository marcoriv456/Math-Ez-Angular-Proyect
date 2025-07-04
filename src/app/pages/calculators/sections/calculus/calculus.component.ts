import {Component} from '@angular/core';
import {ColorSchemas} from "../../../../core/config/color-schemas.config";

@Component({
  selector: 'calculators-calculus',
  templateUrl: './calculus.component.html',
  styleUrl: './calculus.component.css'
})
export class CalculusComponent {

  protected readonly ColorSchemas = ColorSchemas;
}
