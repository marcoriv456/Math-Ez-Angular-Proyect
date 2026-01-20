import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Character } from '../../../../../../core/domain/model/expression/expression-character.model';

@Component({
  selector: 'math-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent {
  @Input({ required: true })
  public Character!: Character;

  @Output()
  public CharacterClick = new EventEmitter<{ side: 'left' | 'right' }>();

  private readonly _ref = inject(ElementRef<HTMLElement>);
  @HostListener('click', ['$event'])
  protected OnClick(event: MouseEvent) {
    event.stopPropagation();
    const clickPosition = event.offsetX;
    let side: 'left' | 'right' =
      this._ref.nativeElement.offsetWidth / 2 > clickPosition
        ? 'left'
        : 'right';

    this.CharacterClick.emit({ side });
  }
}
