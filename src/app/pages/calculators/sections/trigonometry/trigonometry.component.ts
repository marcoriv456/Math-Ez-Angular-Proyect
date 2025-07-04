import {Component} from '@angular/core';
import {CalculatorSection} from "../../core/calculator-section.abstract";
import {ColorSchemas} from "../../../../core/config/color-schemas.config";

@Component({
  selector: 'calculators-trigonometry',
  templateUrl: './trigonometry.component.html',
  styleUrl: './trigonometry.component.css'
})
export class TrigonometryComponent extends CalculatorSection {
  protected override colorSchema = ColorSchemas.TRIGONOMETRY;
}
