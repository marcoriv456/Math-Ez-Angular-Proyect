import { Expression } from '../../model/expression/expression.model';
describe('TermList', () => {
  let termList: Expression;
  const addAll = (termList: Expression, chars: string[] | string) => {
    chars = typeof chars == 'string' ? chars.split('') : chars;
    chars.forEach((char) => termList.AddCharacter(char));
  };

  const extractCharacters = (termList: Expression) =>
    (termList.AsArray[0] as Expression).Characters.map((c) => c.Character);

  beforeEach(() => {
    termList = new Expression();
  });

  it('Is created', () => {
    expect(termList).toBeTruthy();
  });

  describe('Basic character edition', () => {
    it('Adds a character', () => {
      const character = 'h';

      termList.AddCharacter(character);

      const characters = extractCharacters(termList);
      expect(characters).toEqual([character]);
    });

    it('Removes a character', () => {
      const character = 'h';
      termList.AddCharacter(character);

      termList.RemoveCharacter();

      const characters = extractCharacters(termList);
      expect(characters).toEqual([]);
    });

    it('Adds mutiple characters', () => {
      const phrase = 'hello world';

      addAll(termList, phrase);

      const characters = extractCharacters(termList);
      expect(characters).toEqual(phrase.split(''));
    });

    it('Removes multiple characters', () => {
      const phrase = 'hello world';
      addAll(termList, phrase);

      for (let i = 0; i < 6; i++) {
        termList.RemoveCharacter();
      }

      const characters = extractCharacters(termList);
      expect(characters).toEqual('hello'.split(''));
    });
  });

  describe('Character selection', () => {
    beforeEach(() => {
      addAll(termList, 'hello world');
    });

    it('Selects the beggining.', () => {
      termList.SelectTail();

      expect(termList.SelectedCharacter).toBe(null);
    });

    it('Selects the end.', () => {
      termList.SelectLast();

      expect(termList.SelectedCharacter?.Character).toBe('d');
    });

    it('Selects the next character', () => {
      termList.SelectTail();

      termList.SelectNext();

      expect(termList.SelectedCharacter?.Character).toBe('h');
    });

    it('Selects the previous character', () => {
      termList.SelectLast();

      termList.SelectPrev();

      expect(termList.SelectedCharacter?.Character).toBe('l');
    });

    it('Selects the next character one after another', () => {
      termList.SelectTail();

      for (let i = 0; i < 5; i++) {
        termList.SelectNext();
      }

      expect(termList.SelectedCharacter?.Character).toBe('o');
    });

    it('Selects the previous character one below another', () => {
      termList.SelectLast();

      for (let i = 0; i < 4; i++) {
        termList.SelectPrev(); // w <- o <- r <- l <- d
      }

      expect(termList.SelectedCharacter?.Character).toBe('w');
    });

    it('Moves around', () => {
      termList.SelectTail();

      for (let i = 0; i < 8; i++) {
        termList.SelectNext(); //{tail} -> h -> e -> l -> l -> o -> \s -> w -> o
      }
      for (let i = 0; i < 3; i++) {
        termList.SelectPrev(); // o <- \s <- w <- o
      }

      expect(termList.SelectedCharacter?.Character).toBe('o');
    });
  });

  describe('Selective character edition ', () => {
    beforeEach(() => {
      addAll(termList, 'hello world');
    });
    it('Adds characters after the selected character', () => {
      termList.SelectTail();

      addAll(termList, 'hey ');

      const characters = extractCharacters(termList);
      expect(characters).toEqual('hey hello world'.split(''));
    });

    it('Removes character before the selected character', () => {
      termList.SelectLast();

      for (let i = 0; i < 6; i++) {
        termList.RemoveCharacter();
      }

      const characters = extractCharacters(termList);
      expect(characters).toEqual('hello'.split(''));
    });
  });
});
