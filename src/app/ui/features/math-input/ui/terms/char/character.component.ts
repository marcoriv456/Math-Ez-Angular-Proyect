import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'math-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent {
  @Input({ required: true })
  public char!: string;
}
