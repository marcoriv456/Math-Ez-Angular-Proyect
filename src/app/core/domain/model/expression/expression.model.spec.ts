import { EditingCursor } from '../../../structures/cursor/editing-cursor.interface';
import { CompositeExpressionNode } from '../../abstract/composite-expression-node/composite-expression-node.interface';
import { ExpressionNode } from '../../abstract/expression-node.interface';
import { Expression } from '../../model/expression/expression.model';
import { Character } from '../character/character.model';
import { Fraction } from '../fraction/fraction.model';
import { RootExpression } from './root-expression.model';
describe('TermList', () => {
  let expression: Expression;
  const addAll = (
    cursor: EditingCursor<ExpressionNode>,
    chars: string[] | string,
  ) => {
    chars = typeof chars == 'string' ? chars.split('') : chars;
    chars.forEach((char) => cursor.Add(new Character(char)));
  };

  const extractCharacters = (expression: Expression) =>
    expression.AsArray.map((n) => (n instanceof Character ? n.Character : '%'));
  const extractActive = (expression: Expression) => {
    if (expression.ActiveNode?.Value instanceof Character)
      return expression.ActiveNode.Value.Character;
    else if (expression.ActiveNode?.Value instanceof CompositeExpressionNode)
      return extractActive(expression.ActiveNode.Value.FocusedNode.Value);
    return null;
  };
  beforeEach(() => {
    expression = new RootExpression();
  });

  it('Is created', () => {
    expect(expression).toBeTruthy();
  });

  describe('Basic character edition', () => {
    it('Adds a character', () => {
      const character = 'h';

      expression.Add(new Character(character));

      const characters = extractCharacters(expression);
      expect(characters).toEqual([character]);
    });

    it('Removes a character', () => {
      const character = 'h';
      expression.Add(new Character(character));

      expression.Remove();

      const characters = extractCharacters(expression);
      expect(characters).toEqual([]);
    });

    it('Adds mutiple characters', () => {
      const phrase = 'hello world';

      addAll(expression, phrase);

      const characters = extractCharacters(expression);
      expect(characters).toEqual(phrase.split(''));
    });

    it('Removes multiple characters', () => {
      const phrase = 'hello world';
      addAll(expression, phrase);

      for (let i = 0; i < 6; i++) {
        expression.Remove();
      }

      const characters = extractCharacters(expression);
      expect(characters).toEqual('hello'.split(''));
    });
  });

  describe('Character selection', () => {
    beforeEach(() => {
      addAll(expression, 'hello world');
    });

    it('Selects the beggining.', () => {
      expression.SelectTail();

      expect(expression.ActiveNode).toBe(null);
    });

    it('Selects the end.', () => {
      expression.SelectLast();

      expect(extractActive(expression)).toBe('d');
    });

    it('Selects the next character', () => {
      expression.SelectTail();

      expression.SelectNext();

      expect(extractActive(expression)).toBe('h');
    });

    it('Selects the previous character', () => {
      expression.SelectLast();

      expression.SelectPrev();

      expect(extractActive(expression)).toBe('l');
    });

    it('Selects the next character one after another', () => {
      expression.SelectTail();

      for (let i = 0; i < 5; i++) {
        expression.SelectNext();
      }

      expect(extractActive(expression)).toBe('o');
    });

    it('Selects the previous character one below another', () => {
      expression.SelectLast();

      for (let i = 0; i < 4; i++) {
        expression.SelectPrev(); // w <- o <- r <- l <- d
      }

      expect(extractActive(expression)).toBe('w');
    });

    it('Moves around', () => {
      expression.SelectTail();

      for (let i = 0; i < 8; i++) {
        expression.SelectNext(); //{tail} -> h -> e -> l -> l -> o -> \s -> w -> o
      }
      for (let i = 0; i < 3; i++) {
        expression.SelectPrev(); // o <- \s <- w <- o
      }

      expect(extractActive(expression)).toBe('o');
    });
  });

  describe('Selective character edition ', () => {
    beforeEach(() => {
      addAll(expression, 'hello world');
    });
    it('Adds characters after the selected character', () => {
      expression.SelectTail();

      addAll(expression, 'hey ');

      const characters = extractCharacters(expression);
      expect(characters).toEqual('hey hello world'.split(''));
    });

    it('Removes character before the selected character', () => {
      expression.SelectLast();

      for (let i = 0; i < 6; i++) {
        expression.Remove();
      }

      const characters = extractCharacters(expression);
      expect(characters).toEqual('hello'.split(''));
    });
  });

  describe('Nested element edition ', () => {
    let fraction: Fraction;

    beforeEach(() => {
      expression = new RootExpression();
      fraction = new Fraction();
    });

    it('Adds an special element and focuses it', () => {
      expression.Add(fraction);

      expect(expression.AsArray).toEqual([fraction]);
      expect(expression.HasFocused).toBe(true);
      expect(expression.FocusedNode).toEqual(fraction.Link);
    });

    it('Removes an special unfocused element', () => {
      expression.Add(fraction);
      expression.Blur().andKeepSelection();

      expression.Remove();

      expect(expression.AsArray).toEqual([]);
      expect(expression.FocusedNode).toBeNull();
    });
  });

  describe('Nested element selection', () => {
    let fraction: Fraction;
    describe('at 1st level nesting', () => {
      beforeEach(() => {
        expression = new RootExpression();
        fraction = new Fraction();
        addAll(fraction, '123');
        fraction.SelectLastExpression();
        addAll(fraction, '456');
        expression.Add(fraction);
        expression.Blur().andKeepSelection();
        expression.SelectTail();
      });

      it('When the next element is focusable, focuses it and moves to the first character of its first expression', () => {
        expression.SelectNext();

        expect(expression.HasFocused).toBe(true);
        expect(expression.FocusedNode?.Value).toEqual(fraction);
        expect(expression.ActiveNode?.Value).toEqual(fraction);
        expect(fraction.FocusedNode.Value).toEqual(fraction.Numerator);
        expect(extractActive(expression)).toBeNull();
      });

      it('When the previous element is focusable, focuses it and moves to its first character', () => {
        expression.SelectLast();

        expression.SelectPrev();

        expect(expression.HasFocused).toBe(true);
        expect(expression.FocusedNode?.Value).toEqual(fraction);
        expect(expression.ActiveNode?.Value).toEqual(fraction);
        expect(fraction.FocusedNode.Value).toEqual(fraction.Denominator);
        expect(extractActive(expression)).toBe('6');
      });
    });
  });
});
