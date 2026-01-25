import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MathInputComponent } from './math-input.component';
import { MathInputTestPageComponent } from './test/math-input-test-page/math-input-test-page.component';
import { TermListComponent } from './ui/atoms/term-list/term-list.component';
import { MathTermViewDirective } from './ui/directives/math-term-view/math-term-view.directive';
import { CaretComponent } from './ui/organisms/caret/caret.component';
import { CharacterComponent } from './ui/terms/char/character.component';
import { FractionComponent } from './ui/terms/fraction/fraction.component';

@NgModule({
  declarations: [
    MathInputComponent,
    MathInputTestPageComponent,
    TermListComponent,
    CharacterComponent,
    CaretComponent,
    MathTermViewDirective,
    FractionComponent,
  ],
  imports: [CommonModule],
  exports: [MathInputComponent],
})
export class MathInputModule {}
