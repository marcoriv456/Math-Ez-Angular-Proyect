import { Expression } from '../../model/expression/expression.model';
import { Character } from '../character/character.model';
import { RootExpression } from './root-expression.model';
describe('TermList', () => {
  let expression: Expression;
  const addAll = (expression: Expression, chars: string[] | string) => {
    chars = typeof chars == 'string' ? chars.split('') : chars;
    chars.forEach((char) => expression.AddCharacter(char));
  };

  const extractCharacters = (expression: Expression) =>
    expression.AsArray.map((n) => (n instanceof Character ? n.Character : '%'));
  const extractActive = (expression: Expression) =>
    expression.ActiveNode instanceof Character
      ? expression.ActiveNode.Character
      : '%';
  beforeEach(() => {
    expression = new RootExpression();
  });

  it('Is created', () => {
    expect(expression).toBeTruthy();
  });

  describe('Basic character edition', () => {
    it('Adds a character', () => {
      const character = 'h';

      expression.AddCharacter(character);

      const characters = extractCharacters(expression);
      expect(characters).toEqual([character]);
    });

    it('Removes a character', () => {
      const character = 'h';
      expression.AddCharacter(character);

      expression.RemoveCharacter();

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
        expression.RemoveCharacter();
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
        expression.RemoveCharacter();
      }

      const characters = extractCharacters(expression);
      expect(characters).toEqual('hello'.split(''));
    });
  });
});
