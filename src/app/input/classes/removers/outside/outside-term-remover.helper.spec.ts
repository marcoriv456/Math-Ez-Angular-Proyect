import {TermUtils} from "../../term-utils.util";
import {OutsideTermRemover} from "./outside-term-remover.helper";
import {expect} from "chai";
import {Term} from "../../../models/terms/term.model";


describe('Outside term remover: ', () => {
  describe('Removing simple characters: ', () => {
    it('Instructs to remove a single character', () => {
      const terms=TermUtils.parse('hello')
      const remover=new OutsideTermRemover(terms,4)

      const instructions=remover.remove()
      TermUtils.performRemoverInstructions(terms,instructions)

      expect(terms).to.deep.equal(TermUtils.parse('hell'))
      expect(instructions.moveTo).to.equal(3)
    });
  });

  describe('Removing parenthesis: ', () => {
    it('Instructs to remove the parenthesis, but leave its remaining terms and and open parenthesis', () => {
      const terms:Term[]=[{type:'parenthesis', parenthesisChildren:TermUtils.parse('hello')}]
      const remover=new OutsideTermRemover(terms,0)

      const instructions=remover.remove()
      TermUtils.performRemoverInstructions(terms,instructions)
      expect(terms).to.deep.equal(TermUtils.parse('(hello'))
      expect(instructions.moveTo).to.equal(5)
    });
  });
});
