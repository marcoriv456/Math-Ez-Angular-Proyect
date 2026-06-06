import { EditingCursor } from '../../../structures/cursor/editing-cursor.interface';
import { Character } from '../../model/character/character.model';
import { RootExpression } from '../../model/expression/root-expression.model';
import { Fraction } from '../../model/fraction/fraction.model';
import { ExpressionNode } from '../expression-node.interface';

describe('Composite expression node (using Fraction as implementation)', () => {
  let root: RootExpression;
  let node: Fraction;
  const addAll = (
    cursor: EditingCursor<ExpressionNode>,
    chars: string[] | string,
  ) => {
    chars = typeof chars == 'string' ? chars.split('') : chars;
    chars.forEach((char) => cursor.Add(new Character(char)));
  };
  beforeEach(() => {
    root = new RootExpression();
    node = new Fraction();
    root.Add(node);
  });

  describe('Adding elements', () => {
    it('Adds nodes to the focused node (Fraction numerator)', () => {
      const phrase = 'hello';
      node.SelectFirstExpression();

      addAll(root, phrase);

      expect(node.Numerator.AsArray).toEqual(phrase.split(''));
    });

    it('Adds nodes to the focused node (Fraction denominator)', () => {
      const phrase = 'hello';
      node.SelectLastExpression();

      addAll(root, phrase);

      expect(node.Denominator.AsArray).toEqual(phrase.split(''));
    });
  });

  describe('Removing elements', () => {
    it('Removes nodes to the focused node (Fraction numerator)', () => {
      const phrase = 'hello';
      node.SelectFirstExpression();
      addAll(root, phrase);

      root.Remove();

      expect(node.Numerator.AsArray).toEqual('hell'.split(''));
    });

    it('Adds nodes to the focused node (Fraction denominator)', () => {
      const phrase = 'hello';
      node.SelectLastExpression();
      addAll(root, phrase);

      root.Remove();

      expect(node.Denominator.AsArray).toEqual('hell'.split(''));
    });
  });
});
