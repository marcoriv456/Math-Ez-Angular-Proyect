import {TermAdderInstructions} from "../../../models/term-adder-instructions.model";
import {Term} from "../../../models/terms/term.model";
import {TermUtils} from "../../term-utils";
import {ParenthesisAdder} from "./parenthesis-adder.helper";
import {expect} from 'chai'
describe('Parenthesis adder: ', () => {

  describe('When not matches are found: ', () => {
    it('Throws an error if it doesn\'t find any matching open parenthesis', () => {
      const terms:Term[]=TermUtils.parse('hello')
      const adder=new ParenthesisAdder(4,terms,')')

      expect(adder.add.bind(adder)).to.throw('Not matching parenthesis found')
    });

    it('Throws an error if it doesn\'t find any matching closed parenthesis' , () => {
      const terms:Term[]=TermUtils.parse('hello')
      const adder=new ParenthesisAdder(-1,terms,'(')

      expect(adder.add.bind(adder)).to.throw("Not matching parenthesis found")
    });
  });

  describe('Matching parenthesis', () => {

    it('Instructs to add a parenthesis if it finds a matching closed parenthesis', () => {
      const terms:Term[]=TermUtils.parse('(')
      const adder=new ParenthesisAdder(0,terms,')')

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type:'parenthesis', parenthesisChildren:[]}])
      expect(instructions.containerToMoveAt).to.equal('outside')
    });

    it('Instructs to add a parenthesis if it finds a matching open parenthesis', () => {
      const terms:Term[]=TermUtils.parse(')')
      const adder=new ParenthesisAdder(-1,terms,'(')

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type:'parenthesis', parenthesisChildren:[]}])
      expect(instructions.containerToMoveAt).to.equal(0)
    });
  });
  describe('Wrapping terms between the parenthesis', () => {
    it('Instructs to wrap the terms between the parenthesis, matching a open parenthesis', () => {
      const terms:Term[]=TermUtils.parse('(hello')
      const adder=new ParenthesisAdder(5,terms,')')

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type:'parenthesis', parenthesisChildren:TermUtils.parse('hello')}])
      expect(instructions.containerToMoveAt).to.equal('outside')
    });

    it('Instructs to wrap the terms between the parenthesis, matching a closed parenthesis', () => {
      const terms:Term[]=TermUtils.parse('hello)')
      const adder=new ParenthesisAdder(-1,terms,'(')

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type:'parenthesis', parenthesisChildren:TermUtils.parse('hello')}])
      expect(instructions.containerToMoveAt).to.equal(0)
    });
  });
});
