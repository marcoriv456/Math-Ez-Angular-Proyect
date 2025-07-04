import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorsComponent} from './calculators.component';
import {IntroductionComponent} from './sections/introduction/introduction.component';
import {SharedModule} from "../../ui/shared/shared.module";
import {TopicSectionComponent} from './ui/particles/topic-section/topic-section.component';
import {TopicCardComponent} from './ui/molecules/topic-card/topic-card.component';
import {CalculusComponent} from './sections/calculus/calculus.component';
import {AlgebraComponent} from './sections/algebra/algebra.component';


@NgModule({
  declarations: [
    CalculatorsComponent,
    IntroductionComponent,
    TopicSectionComponent,
    TopicCardComponent,
    CalculusComponent,
    AlgebraComponent
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
