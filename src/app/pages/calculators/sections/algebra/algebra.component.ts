import {Component} from '@angular/core';
import {CalculatorSection} from "../../core/calculator-section.abstract";
import {ColorSchemas} from "../../../../core/config/color-schemas.config";

@Component({
  selector: 'calculators-algebra',
  templateUrl: './algebra.component.html',
  styleUrl: './algebra.component.css'
})
export class AlgebraComponent extends CalculatorSection {
  protected override colorSchema = ColorSchemas.ALGEBRA;
}
