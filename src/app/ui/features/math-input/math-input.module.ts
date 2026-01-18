import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathInputComponent } from './math-input.component';
import { MathInputTestPageComponent } from './test/math-input-test-page/math-input-test-page.component';
import { TermListComponent } from './ui/atoms/term-list/term-list.component';
import { CharacterComponent } from './ui/terms/char/character.component';

@NgModule({
  declarations: [
    MathInputComponent,
    MathInputTestPageComponent,
    TermListComponent,
    CharacterComponent,
  ],
  imports: [CommonModule],
  exports: [MathInputComponent],
})
export class MathInputModule {}
