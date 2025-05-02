import {SpecialCharFinder} from "./special-char-finder.helper";
import {TermUtils} from "../../utils/term-utils.util";
import {expect} from 'chai'

describe('Special char finder: ', () => {
  const generateFinder = (index:number, phrase:string) => {
    return new SpecialCharFinder(index,TermUtils.parse(phrase))
  }

  describe('Generating indexes to move at: ', () => {
    it('Returns the index previous to the next irregular character if the input index is not already behind it', () => {
      const finder=generateFinder(-1, "hello+world")

      const indexToMoveAt=finder.findNextIndexToMoveAt()

      expect(indexToMoveAt).to.equal(4)
    });

    it('Returns the index next to the next irregular character if the input index is already behind it', () => {
      const finder=generateFinder(4,"hello+world")

      const indexToMoveAt=finder.findNextIndexToMoveAt()

      expect(indexToMoveAt).to.equal(5)
    });

    it('Returns the last position if there is no next irregular character', () => {
      const finder=generateFinder(-1,"helloworld")

      const indexToMoveAt=finder.findNextIndexToMoveAt()

      expect(indexToMoveAt).to.equal(9)
    });

    it('It behaves normally moving forward even if the first character is irregular', () => {
      const finder=generateFinder(-1,'+')

      const indexToMoveAt=finder.findNextIndexToMoveAt()

      expect(indexToMoveAt).to.equal(0)
    });

    it('Returns the index next to the previous irregular character if the input index is not already next to it', () => {
      const finder=generateFinder(10,"hello+world")

      const indexToMoveAt=finder.findPreviousIndexToMoveAt()

      expect(indexToMoveAt).to.equal(5)
    });

    it('Returns the index behind to the previous irregular character if the input index is already next to it', () => {
      const finder=generateFinder(5,"hello+world")

      const indexToMoveAt=finder.findPreviousIndexToMoveAt()

      expect(indexToMoveAt).to.equal(4)
    });

    it('Returns the first position if there is no previous irregular character', () => {
      const finder=generateFinder(9, "helloworld")

      const indexToMoveAt=finder.findPreviousIndexToMoveAt()

      expect(indexToMoveAt).to.equal(-1)
    });

    it('It behaves normally moving backwards even if the first character is irregular', () => {
      const finder=generateFinder(0,'+')

      const indexToMoveAt=finder.findPreviousIndexToMoveAt()

      expect(indexToMoveAt).to.equal(-1)
    });
  })

  describe('Finding irregular characters: ', () => {
    it('Returns the next irregular character index', () => {
      const finder=generateFinder(-1,"hello+world")

      const next=finder.findNext()

      expect(next).to.equal(5)
    });

    it('Returns the last character\'s index if it doesn\'t find any next irregular character', () => {
      const finder=generateFinder(5,"hello+world")

      const next=finder.findNext()

      expect(next).to.equal(11)
    });

    it('Returns the previous irregular character index', () => {
      const finder=generateFinder(10,"hello+world")

      const previous=finder.findPrevious()

      expect(previous).to.equal(5)
    });

    it('Returns the first character\'s index if it doesn\'t find any previous irregular character', () => {
      const finder=generateFinder(4,"hello+world")

      const previous=finder.findPrevious()

      expect(previous).to.equal(-1)
    });
  });
});
