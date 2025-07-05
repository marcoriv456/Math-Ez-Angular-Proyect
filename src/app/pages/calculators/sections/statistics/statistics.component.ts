import {Component} from '@angular/core';
import {CalculatorSection} from "../../core/calculator-section.abstract";
import {ColorSchemas} from "../../../../core/config/color-schemas.config";

@Component({
  selector: 'calculators-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent extends CalculatorSection {
  protected override colorSchema = ColorSchemas.STATISTICS;
}
