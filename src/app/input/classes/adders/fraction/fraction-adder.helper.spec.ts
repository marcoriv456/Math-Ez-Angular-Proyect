import {FractionAdder} from "./fraction-adder.helper";
import {Term} from "../../../models/terms/term.model";
import {TermUtils} from "../../term-utils";
import {expect} from "chai";

describe('Fraction adder: ', () => {
  describe('Not available autocompletion: ', () => {
      it('Instructs to add an empty fraction if it doesn\'t find other chars to autocomplete with', () => {
        const terms:Term[]=[]
        const adder=new FractionAdder(terms,-1)

        const instructions=adder.add()
        TermUtils.performAdderInstructions(terms,instructions)

        expect(terms).to.deep.equal([{type: 'fraction', numeratorChildren: [], denominatorChildren: []}])
        expect(instructions.containerToMoveAt).to.equal(0)
      });

      it('Instructs to add an empty fraction if it is surrounded by irregular characters', () => {
        const terms=TermUtils.parse('+-')
        const adder=new FractionAdder(terms,0)

        const instructions=adder.add()
        TermUtils.performAdderInstructions(terms,instructions)

        expect(terms).to.deep.equal([{type:'char',char:'+'},{type: 'fraction', numeratorChildren: [], denominatorChildren: []},{type:'char',char:'-'}])
        expect(instructions.containerToMoveAt).to.equal(0)
      });
  });

  describe('Numerator autocompletion: ', () => {
    it('Instructs to add a fraction with the found terms as the numerator content, even when there are no irregular characters around', () => {
      const terms=TermUtils.parse('hello')
      const adder=new FractionAdder(terms,4)

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type: 'fraction', numeratorChildren: TermUtils.parse('hello'), denominatorChildren: []}])
      expect(instructions.containerToMoveAt).to.equal(1)
    });
    it('Instructs to add a fraction with the found terms as the numerator content, using the previous irregular character as delimiter', () => {
      const terms=TermUtils.parse('+hello')
      const adder=new FractionAdder(terms,5)

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type:'char',char:'+'},{type: 'fraction', numeratorChildren: TermUtils.parse('hello'), denominatorChildren: []}])
      expect(instructions.containerToMoveAt).to.equal(1)
    });
  });

  describe('Denominator autocompletion: ', () => {
    it('Instructs to add a fraction with the found terms as the denominator content, even when there are no irregular characters around', () => {
      const terms=TermUtils.parse('hello')
      const adder=new FractionAdder(terms,-1)

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type: 'fraction', numeratorChildren:[], denominatorChildren:TermUtils.parse('hello')}])
      expect(instructions.containerToMoveAt).to.equal(0)
    });

    it('Instructs to add a fraction with the found terms as the denominator content, using the next irregular character as delimiter', () => {
      const terms=TermUtils.parse('hello+')
      const adder=new FractionAdder(terms,-1)

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type: 'fraction', numeratorChildren:[], denominatorChildren:TermUtils.parse('hello')},{type:'char',char:'+'}])
      expect(instructions.containerToMoveAt).to.equal(0)
    });
  });

  describe('Full autocompletion:', () => {

    it('Instructs to add a fraction with the found terms as the denominator and numerator content, even when there are no irregular characters around', () => {
      const terms=TermUtils.parse('helloworld')
      const adder=new FractionAdder(terms,4)

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type: 'fraction', numeratorChildren:TermUtils.parse('hello'), denominatorChildren:TermUtils.parse('world')}])
      expect(instructions.containerToMoveAt).to.equal('outside')
    });

    it('Instructs to add a fraction with the found terms as the numerator and denominator content, using the next and previous irregular character as delimiter', () => {
      const terms=TermUtils.parse('+helloworld+')
      const adder=new FractionAdder(terms,5)

      const instructions=adder.add()
      TermUtils.performAdderInstructions(terms,instructions)

      expect(terms).to.deep.equal([{type:'char',char:'+'},{type: 'fraction', numeratorChildren:TermUtils.parse('hello'), denominatorChildren:TermUtils.parse('world')},{type:'char',char:'+'}])
      expect(instructions.containerToMoveAt).to.equal('outside')
    });
  });
});
