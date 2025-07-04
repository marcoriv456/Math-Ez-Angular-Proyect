import {Component} from '@angular/core';
import {CalculatorSection} from "../../core/calculator-section.abstract";
import {ColorSchemas} from "../../../../core/config/color-schemas.config";

@Component({
  selector: 'calculators-introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent extends CalculatorSection {
  protected override colorSchema = ColorSchemas.ALTERNATE;
}
