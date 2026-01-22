import { Expression } from '../../model/expression/expression.model';
describe('TermList', () => {
  let expression: Expression;
  const addAll = (exp: Expression, chars: string[] | string) => {
    chars = typeof chars == 'string' ? chars.split('') : chars;
    chars.forEach((char) => exp.Add(char));
  };

  const extractCharacters = (exp: Expression) =>
    exp.Characters.map((c) => c.Character);
  beforeEach(() => {
    expression = new Expression();
  });

  it('Is created', () => {
    expect(expression).toBeTruthy();
  });

  describe('Basic character edition', () => {
    it('Adds a character', () => {
      const character = 'h';

      expression.Add(character);

      const characters = extractCharacters(expression);
      expect(characters).toEqual([character]);
    });

    it('Removes a character', () => {
      const character = 'h';
      expression.Add(character);

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
      expression.SelectTailCharacter();

      expect(expression.Selection).toBe(null);
    });

    it('Selects the end.', () => {
      expression.SelectLastCharacter();

      expect(expression.Selection?.Value.Character).toBe('d');
    });

    it('Selects the next character', () => {
      expression.SelectTailCharacter();

      expression.SelectNextCharacter();

      expect(expression.Selection?.Value.Character).toBe('h');
    });

    it('Selects the previous character', () => {
      expression.SelectLastCharacter();

      expression.SelectPrevCharacter();

      expect(expression.Selection?.Value.Character).toBe('l');
    });

    it('Selects the next character one after another', () => {
      expression.SelectTailCharacter();

      for (let i = 0; i < 5; i++) {
        expression.SelectNextCharacter();
      }

      expect(expression.Selection?.Value.Character).toBe('o');
    });

    it('Selects the previous character one below another', () => {
      expression.SelectLastCharacter();

      for (let i = 0; i < 4; i++) {
        expression.SelectPrevCharacter(); // w <- o <- r <- l <- d
      }

      expect(expression.Selection?.Value.Character).toBe('w');
    });

    it('Moves around', () => {
      expression.SelectTailCharacter();

      for (let i = 0; i < 8; i++) {
        expression.SelectNextCharacter(); //{tail} -> h -> e -> l -> l -> o -> \s -> w -> o
      }
      for (let i = 0; i < 3; i++) {
        expression.SelectPrevCharacter(); // o <- \s <- w <- o
      }

      expect(expression.Selection?.Value.Character).toBe('o');
    });
  });

  describe('Selective character edition ', () => {
    beforeEach(() => {
      addAll(expression, 'hello world');
    });
    it('Adds characters after the selected character', () => {
      expression.SelectTailCharacter();

      addAll(expression, 'hey ');

      const characters = extractCharacters(expression);
      expect(characters).toEqual('hey hello world'.split(''));
    });

    it('Removes character before the selected character', () => {
      expression.SelectLastCharacter();

      for (let i = 0; i < 6; i++) {
        expression.Remove();
      }

      const characters = extractCharacters(expression);
      expect(characters).toEqual('hello'.split(''));
    });
  });
});
