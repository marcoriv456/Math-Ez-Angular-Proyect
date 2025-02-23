import {TermUtils} from "../../term-utils";
import {CtrlRemover} from "./ctrl-remover.helper";
import {expect} from "chai";

describe('Ctrl remover: ', () => {
  it('Instructs to remove the terms until the previous irregular character', () => {
    const terms=TermUtils.parse('hello+world')
    const remover=new CtrlRemover(terms,10)

    const instructions=remover.remove()
    TermUtils.performRemoverInstructions(terms,instructions)

    expect(terms).to.deep.equal(TermUtils.parse('hello+'))
    expect(instructions.moveTo).to.equal(5)
  });

  it('Instructs to remove the previous irregular character if the index is already next to one', () => {
    const terms=TermUtils.parse('hello+')
    const remover=new CtrlRemover(terms,5)

    const instructions=remover.remove()
    TermUtils.performRemoverInstructions(terms,instructions)

    expect(terms).to.deep.equal(TermUtils.parse('hello'))
    expect(instructions.moveTo).to.equal(4)
  });

  it("Instructs to remove all the characters if it doesn't find any previous irregular character", () => {
    const terms=TermUtils.parse('hello')
    const remover=new CtrlRemover(terms,4)

    const instructions=remover.remove()
    TermUtils.performRemoverInstructions(terms,instructions)

    expect(terms).to.deep.equal([])
    expect(instructions.moveTo).to.equal(-1)
  });
});
