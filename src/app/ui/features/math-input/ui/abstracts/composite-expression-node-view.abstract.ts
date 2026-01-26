import { Directive, QueryList, ViewChildren } from '@angular/core';
import { CompositeExpressionNode } from '../../../../../core/domain/abstract/composite-expression-node.interface';
import { ExpressionComponent } from '../atoms/expression/expression.component';
import { ExpressionNodeView } from './expression-node-view.abstract';
@Directive()
export abstract class CompositeExpressionNodeView extends ExpressionNodeView {
  @ViewChildren(ExpressionComponent)
  protected _expressionViews!: QueryList<ExpressionComponent>;

  abstract Node: CompositeExpressionNode;

  get CaretPosition(): number {
    const renderedExpression = this._focusedExpressionView;
    if (!renderedExpression)
      throw new Error('Could not retrieve caret position for focused element.');
    return renderedExpression.CaretPosition;
  }

  private get _focusedExpressionView(): ExpressionComponent | null {
    if (this.Node.FocusedNode.Index == null)
      throw new Error('Could not retrieve focused expression index.');
    return this._expressionViews.get(this.Node.FocusedNode.Index) || null;
  }
}
