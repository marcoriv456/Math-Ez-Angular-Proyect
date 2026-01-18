import { Component } from '@angular/core';
import { TermList } from '../../../../../../core/domain/structures/term-list/term-list.model';
import { MathTerm } from '../../../../../../core/domain/abstract/math-term.abstract';
import { Expression } from '../../../../../../core/domain/model/expression/expression.model';

@Component({
  selector: 'input-term-list',
  templateUrl: './term-list.component.html',
  styleUrl: './term-list.component.css',
})
export class TermListComponent {
  protected _termList = new TermList();

  public add(char: string) {
    this._termList.addCharacter(char);
  }

  protected isExpression(term: MathTerm): term is Expression {
    return term instanceof Expression;
  }
}
