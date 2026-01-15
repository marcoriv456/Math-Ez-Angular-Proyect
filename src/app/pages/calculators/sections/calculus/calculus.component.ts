import { Component } from '@angular/core';
import { ColorSchemas } from '../../../../core/config/color-schemas.config';
import { CalculatorSection } from '../../core/calculator-section.abstract';

@Component({
  selector: 'calculators-calculus',
  templateUrl: './calculus.component.html',
  styleUrl: './calculus.component.css',
})
export class CalculusComponent extends CalculatorSection {
  protected override colorSchema = ColorSchemas.CALCULUS;
}
