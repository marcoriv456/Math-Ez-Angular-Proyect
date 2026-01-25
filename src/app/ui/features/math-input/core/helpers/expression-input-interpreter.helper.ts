import { ExpressionNode } from '../../../../../core/domain/abstract/expression-node.interface';
import { Character } from '../../../../../core/domain/model/character/character.model';
import { Fraction } from '../../../../../core/domain/model/fraction/fraction.model';

export class ExpressionInputIntepreter {
  public static interpret(input: string): ExpressionNode {
    switch (input) {
      case '/':
        return new Fraction();
      default:
        return new Character(input);
    }
  }
}
