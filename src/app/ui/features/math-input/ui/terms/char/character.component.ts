import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Character } from '../../../../../../core/domain/model/character/character.model';
import { ExpressionNodeView } from '../../abstracts/expression-node-view.abstract';

@Component({
  selector: 'math-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
  providers: [
    {
      provide: ExpressionNodeView,
      useExisting: forwardRef(() => CharacterComponent),
    },
  ],
})
export class CharacterComponent extends ExpressionNodeView {
  @Input({ required: true })
  public Character!: Character;

  @Output()
  public CharacterClick = new EventEmitter<{ side: 'left' | 'right' }>();

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
