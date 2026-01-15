import { CaretVisibilityChecker } from './caret-visibility-checker.helper';
import { expect } from 'chai';

describe('Caret visibility checker: ', () => {
  it('Returns undefined if the caret is already visible', () => {
    const checker = new CaretVisibilityChecker(100, 40);

    const scrollToOptions = checker.makeCharVisible(50);

    expect(scrollToOptions).to.be.undefined;
  });

  it('Indicates the position to move the scroll at if the caret is not visible', () => {
    const viewWidth = 100;
    const scrollLeft = 30;
    const caretPosition = 150;
    const checker = new CaretVisibilityChecker(viewWidth, scrollLeft);

    const scrollToOptions = checker.makeCharVisible(caretPosition);

    expect(scrollToOptions?.left).to.equal(50);
  });

  it("Indicates to make a light adjustment after the change if the caret is in the overlay's right border", () => {
    const viewWidth = 100;
    const scrollLeft = 30;
    const caretPosition = 150;
    const checker = new CaretVisibilityChecker(viewWidth, scrollLeft);

    checker.makeCharVisible(caretPosition);

    expect(checker.scrollNeedsAdjustment).to.be.true;
  });

  it("Indicates to move the scroll to the same caret position if the caret is in the overlay's left border", () => {
    const viewWidth = 200;
    const scrollLeft = 110;
    const caretPosition = 60;
    const checker = new CaretVisibilityChecker(viewWidth, scrollLeft);

    const scrollToOptions = checker.makeCharVisible(caretPosition);

    expect(scrollToOptions?.left).to.equal(caretPosition);
  });

  it("Doesn't indicate to make an small adjustment if the caret is in the overlay's left border", () => {
    const viewWidth = 200;
    const scrollLeft = 110;
    const caretPosition = 60;
    const checker = new CaretVisibilityChecker(viewWidth, scrollLeft);

    checker.makeCharVisible(caretPosition);

    expect(checker.scrollNeedsAdjustment).to.be.false;
  });
});
