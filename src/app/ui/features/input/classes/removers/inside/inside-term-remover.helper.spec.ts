import {Term} from "../../../core/models/terms/term.model";
import {TermUtils} from "../../term-utils.util";
import {InsideTermRemover} from "./inside-term-remover.helper";
import {expect} from "chai";

describe('Inside term remover: ', () => {
  describe('Removing any term: ', () => {
    it('Instructs to remove the terms but to leave the actual container remaining terms', () => {
      const terms=TermUtils.parse('hello')
      const mathElementTerm:Term={type:'exponent', exponentChildren:terms}
      const parentContainerTerms:Term[]=[mathElementTerm]

      const remover=new InsideTermRemover(terms,mathElementTerm,0,0)
      const instructions=remover.remove()

      TermUtils.performRemoverInstructions(parentContainerTerms,instructions)
      expect(parentContainerTerms).to.deep.equal(TermUtils.parse('hello'))
      expect(instructions.moveTo).to.equal(-1)
    });
  });

  describe('Removing fractions', () => {

    describe('Being inside the numerator: ', () => {
      it('If the whole fraction is empty, it just removes it', () => {
        const terms:Term[]=[];
        const mathElementTerm:Term={type:'fraction', numeratorChildren:[],denominatorChildren:terms}
        const parentContainerTerms:Term[]=[mathElementTerm]
        const remover=new InsideTermRemover(terms,mathElementTerm,0,0)

        const instructions=remover.remove()
        TermUtils.performRemoverInstructions(parentContainerTerms,instructions)

        expect(parentContainerTerms).to.deep.equal([])
        expect(instructions.moveTo).to.equal(-1)
      });

      it('If the numerator is empty and the denominator is filled, it instructs to remove the fraction but to leave the denominator terms, and place the caret behind them', () => {
        const terms=TermUtils.parse('hello')
        const mathElementTerm:Term={type:'fraction', numeratorChildren:[],denominatorChildren:terms}
        const parentContainerTerms:Term[]=[mathElementTerm]
        const remover=new InsideTermRemover(terms,mathElementTerm,0,0)

        const instructions=remover.remove()
        TermUtils.performRemoverInstructions(parentContainerTerms,instructions)

        expect(parentContainerTerms).to.deep.equal(TermUtils.parse('hello'))
        expect(instructions.moveTo).to.equal(-1)
      });

      it('If the numerator is filled and the denominator is empty, it instructs to remove the fraction term but to leave the numerator terms, and place the caret behind them ', () => {
        const terms=TermUtils.parse('hello')
        const mathElementTerm:Term={type:'fraction', numeratorChildren:terms,denominatorChildren:[]}
        const parentContainerTerms:Term[]=[mathElementTerm]
        const remover=new InsideTermRemover(terms,mathElementTerm,0,0)

        const instructions=remover.remove()
        TermUtils.performRemoverInstructions(parentContainerTerms,instructions)

        expect(parentContainerTerms).to.deep.equal(TermUtils.parse('hello'))
        expect(instructions.moveTo).to.equal(-1)
      });

      it('If the fraction is fulfilled, it instructs to remove the fraction term but to leave the fraction terms, and place the caret behind them', () => {
        const terms=TermUtils.parse('hello')
        const mathElementTerm:Term={type:'fraction', numeratorChildren:terms,denominatorChildren:TermUtils.parse('world')}
        const parentContainerTerms:Term[]=[mathElementTerm]
        const remover=new InsideTermRemover(terms,mathElementTerm,0,0)

        const instructions=remover.remove()
        TermUtils.performRemoverInstructions(parentContainerTerms,instructions)

        expect(parentContainerTerms).to.deep.equal(TermUtils.parse('helloworld'))
        expect(instructions.moveTo).to.equal(-1)
      });

    });
    describe('Being inside the denominator: ', () => {

      it('If the whole fraction is empty, it just removes it', () => {
        const terms:Term[]=[]
        const mathElementTerm:Term={type:'fraction', numeratorChildren:[], denominatorChildren:terms}
        const parentContainerTerms:Term[]=[mathElementTerm]
        const remover=new InsideTermRemover(terms,mathElementTerm,1,0)

        const instructions=remover.remove()
        TermUtils.performRemoverInstructions(parentContainerTerms,instructions)

        expect(parentContainerTerms).to.deep.equal([])
        expect(instructions.moveTo).to.equal(-1)
      });

      it('If the numerator is empty and the denominator is filled, it instructs to remove the fraction term but to leave the denominator terms, and place the caret behind them', () => {
        const terms:Term[]=TermUtils.parse('hello')
        const mathElementTerm:Term={type:'fraction', numeratorChildren:[], denominatorChildren:terms}
        const parentContainerTerms:Term[]=[mathElementTerm]
        const remover=new InsideTermRemover(terms,mathElementTerm,1,0)

        const instructions=remover.remove()
        TermUtils.performRemoverInstructions(parentContainerTerms,instructions)

        expect(parentContainerTerms).to.deep.equal(TermUtils.parse('hello'))
        expect(instructions.moveTo).to.equal(-1)
      });

      it('If the denominator is empty and the numerator is filled, it instructs to remove the fraction term but to leave the numerator terms, and place the caret in front of them', () => {
        const terms:Term[]=[]
        const mathElementTerm:Term={type:'fraction', numeratorChildren:TermUtils.parse('hello'),denominatorChildren:terms}
        const parentContainerTerms:Term[]=[mathElementTerm]
        const remover=new InsideTermRemover(terms,mathElementTerm,1,0)

        const instructions=remover.remove()
        TermUtils.performRemoverInstructions(parentContainerTerms,instructions)

        expect(parentContainerTerms).to.deep.equal(TermUtils.parse('hello'))
        expect(instructions.moveTo).to.equal(4)
      });

      it('If the fraction is fulfilled, it instructs to remove the fraction term but to leave all, the terms and place the caret in the middle of them', () => {
        const terms:Term[]=TermUtils.parse('world')
        const mathElementTerm:Term={type:'fraction', numeratorChildren:TermUtils.parse('hello'),denominatorChildren:terms}
        const parentContainerTerms:Term[]=[mathElementTerm]
        const remover=new InsideTermRemover(terms,mathElementTerm,1,0)

        const instructions=remover.remove()
        TermUtils.performRemoverInstructions(parentContainerTerms,instructions)

        expect(parentContainerTerms).to.deep.equal(TermUtils.parse('helloworld'))
        expect(instructions.moveTo).to.equal(4)
      });



    });

  });
});
