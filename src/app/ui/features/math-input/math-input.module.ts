import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MathInputComponent } from './math-input.component';
import { MathInputTestPageComponent } from './test/math-input-test-page/math-input-test-page.component';
import { ExpressionComponent } from './ui/atoms/expression/expression.component';
import { MathTermViewDirective } from './ui/directives/math-term-view/math-term-view.directive';
import { CaretComponent } from './ui/organisms/caret/caret.component';
import { CharacterComponent } from './ui/terms/char/character.component';
import { FractionComponent } from './ui/terms/fraction/fraction.component';

@NgModule({
  declarations: [
    MathInputComponent,
    MathInputTestPageComponent,
    CharacterComponent,
    CaretComponent,
    MathTermViewDirective,
    FractionComponent,
    ExpressionComponent,
  ],
  imports: [CommonModule],
  exports: [MathInputComponent],
})
export class MathInputModule {}
