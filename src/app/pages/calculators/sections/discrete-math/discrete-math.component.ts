import { Component } from '@angular/core';
import { CalculatorSection } from '../../core/calculator-section.abstract';
import { ColorSchemas } from '../../../../core/config/color-schemas.config';

@Component({
  selector: 'calculators-discrete-math',
  templateUrl: './discrete-math.component.html',
  styleUrl: './discrete-math.component.css',
})
export class DiscreteMathComponent extends CalculatorSection {
  protected override colorSchema = ColorSchemas.DISCRETE_MATH;
}
