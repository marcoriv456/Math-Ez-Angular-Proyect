import { Component } from '@angular/core';
import { CalculatorSection } from '../../core/calculator-section.abstract';
import { ColorSchemas } from '../../../../core/config/color-schemas.config';

@Component({
  selector: 'calculators-measures',
  templateUrl: './measures.component.html',
  styleUrl: './measures.component.css',
})
export class MeasuresComponent extends CalculatorSection {
  protected override colorSchema = ColorSchemas.MEASURES;
}
