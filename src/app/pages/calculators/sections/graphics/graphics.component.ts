import { Component } from '@angular/core';
import { CalculatorSection } from '../../core/calculator-section.abstract';
import { ColorSchemas } from '../../../../core/config/color-schemas.config';

@Component({
  selector: 'calculators-graphics',
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.css',
})
export class GraphicsComponent extends CalculatorSection {
  protected override colorSchema = ColorSchemas.GRAPHICS;
}
