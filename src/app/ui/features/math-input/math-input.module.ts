import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathInputComponent } from './math-input.component';
import { MathInputTestPageComponent } from './test/math-input-test-page/math-input-test-page.component';
import { TermListComponent } from './ui/atoms/term-list/term-list.component';
import { CharacterComponent } from './ui/terms/char/character.component';
import { CaretComponent } from './ui/organisms/caret/caret.component';
import { MathTermViewDirective } from './ui/directives/math-term-view/math-term-view.directive';

@NgModule({
  declarations: [
    MathInputComponent,
    MathInputTestPageComponent,
    TermListComponent,
    CharacterComponent,
    CaretComponent,
    MathTermViewDirective,
  ],
  imports: [CommonModule],
  exports: [MathInputComponent],
})
export class MathInputModule {}
