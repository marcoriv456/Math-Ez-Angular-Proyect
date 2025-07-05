import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorsComponent} from './calculators.component';
import {IntroductionComponent} from './sections/introduction/introduction.component';
import {SharedModule} from "../../ui/shared/shared.module";
import {TopicSectionComponent} from './ui/particles/topic-section/topic-section.component';
import {TopicCardComponent} from './ui/molecules/topic-card/topic-card.component';
import {CalculusComponent} from './sections/calculus/calculus.component';
import {AlgebraComponent} from './sections/algebra/algebra.component';
import {TrigonometryComponent} from './sections/trigonometry/trigonometry.component';
import {StatisticsComponent} from './sections/statistics/statistics.component';
import {DiscreteMathComponent} from './sections/discrete-math/discrete-math.component';
import {GraphicsComponent} from './sections/graphics/graphics.component';
import {MeasuresComponent} from './sections/measures/measures.component';


@NgModule({
  declarations: [
    CalculatorsComponent,
    IntroductionComponent,
    TopicSectionComponent,
    TopicCardComponent,
    CalculusComponent,
    AlgebraComponent,
    TrigonometryComponent,
    StatisticsComponent,
    DiscreteMathComponent,
    GraphicsComponent,
    MeasuresComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CalculatorsComponent
  ]
})
export class CalculatorsModule {
}
