import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathInputComponent } from './math-input.component';
import { MathInputTestPageComponent } from './test/math-input-test-page/math-input-test-page.component';

@NgModule({
  declarations: [MathInputComponent, MathInputTestPageComponent],
  imports: [CommonModule],
  exports: [MathInputComponent],
})
export class MathInputModule {}
