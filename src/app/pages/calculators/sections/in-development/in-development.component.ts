import {Component} from '@angular/core';
import {CalculatorSection} from "../../core/calculator-section.abstract";
import {ColorSchemas} from "../../../../core/config/color-schemas.config";

@Component({
  selector: 'calculators-in-development',
  templateUrl: './in-development.component.html',
  styleUrl: './in-development.component.css'
})
export class InDevelopmentComponent extends CalculatorSection {
  protected override colorSchema = ColorSchemas.ALTERNATE;
  protected readonly ColorSchemas = ColorSchemas;
}
