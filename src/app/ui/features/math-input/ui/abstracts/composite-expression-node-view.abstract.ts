import { Directive, QueryList, ViewChildren } from '@angular/core';
import { CompositeExpressionNode } from '../../../../../core/domain/abstract/composite-expression-node.interface';
import { TermListComponent } from '../atoms/term-list/term-list.component';
import { ExpressionNodeView } from './expression-node-view.abstract';;

@Directive()
export abstract class CompositeExpressionNodeView extends ExpressionNodeView {
  @ViewChildren(TermListComponent)
  protected _expressionViews!: QueryList<TermListComponent>;

  abstract Node: CompositeExpressionNode;

  get CaretPosition(): number {
    const renderedExpression = this._focusedExpressionView;
    if (!renderedExpression)
      throw new Error('Could not retrieve caret position for focused element.');
    return renderedExpression.CaretPosition;
  }

  private get _focusedExpressionView(): TermListComponent | null {
    if (this.Node.FocusedExpressionIndex == null)
      throw new Error('Could not retrieve focused expression index.');
    return this._expressionViews.get(this.Node.FocusedExpressionIndex) || null;
  }
}
