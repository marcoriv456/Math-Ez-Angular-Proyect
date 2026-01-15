import { TermUtils } from '../../../utils/term-utils.util';
import { FunctionAdder } from './function-adder.helper';
import { expect } from 'chai';
import { Term } from '../../../models/terms/term.model';

describe('Function adder: ', () => {
  describe('Adding functions: ', () => {
    const funNames = ['sen', 'cos', 'tan', 'log'];

    describe('In case of not finding any reference', () => {
      it("Throws an error if it doesn't find any function reference", () => {
        const terms = TermUtils.parse('hello');
        const adder = new FunctionAdder(terms, funNames);

        expect(adder.add.bind(adder)).to.throw("Didn't found any function");
      });
    });

    describe('Function adding:', () => {
      it('Instructs to add a function if it find a reference', () => {
        const terms = TermUtils.parse('cos');
        const adder = new FunctionAdder(terms, funNames);

        const instructions = adder.add();
        TermUtils.performAdderInstructions(terms, instructions);

        expect(terms).to.deep.equal([
          {
            type: 'function',
            functionName: 'cos',
            functionChildren: [],
            argumentTerms: undefined,
          },
        ]);
        expect(instructions.containerToMoveAt).to.equal(0);
      });

      it('Instructs to add a function with base terms if it is a logarithm ', () => {
        const terms = TermUtils.parse('log');
        const adder = new FunctionAdder(terms, funNames);

        const instructions = adder.add();
        TermUtils.performAdderInstructions(terms, instructions);

        expect(terms).to.deep.equal([
          {
            type: 'function',
            functionName: 'log',
            functionChildren: [],
            argumentTerms: [],
          },
        ]);
        expect(instructions.containerToMoveAt).to.equal(0);
      });
    });

    describe('Autocompletion using parenthesis: ', () => {
      it('When it finds a parenthesis next to the provided index, it autocompletes the function with the parenthesis terms', () => {
        const terms: Term[] = [
          ...TermUtils.parse('cos'),
          {
            type: 'parenthesis',
            parenthesisChildren: TermUtils.parse('hello'),
          },
        ];
        const adder = new FunctionAdder(terms, funNames);

        const instructions = adder.add();
        TermUtils.performAdderInstructions(terms, instructions);

        expect(terms).to.deep.equal([
          {
            type: 'function',
            functionName: 'cos',
            functionChildren: TermUtils.parse('hello'),
            argumentTerms: undefined,
          },
        ]);
        expect(instructions.containerToMoveAt).to.equal('outside');
      });

      it('When it finds a parenthesis next to the provided index, it autocompletes the logarithm with the parenthesis terms', () => {
        const terms: Term[] = [
          ...TermUtils.parse('log'),
          {
            type: 'parenthesis',
            parenthesisChildren: TermUtils.parse('hello'),
          },
        ];
        const adder = new FunctionAdder(terms, funNames);

        const instructions = adder.add();
        TermUtils.performAdderInstructions(terms, instructions);

        expect(terms).to.deep.equal([
          {
            type: 'function',
            functionName: 'log',
            functionChildren: TermUtils.parse('hello'),
            argumentTerms: [],
          },
        ]);
        expect(instructions.containerToMoveAt).to.equal(0);
      });
    });
  });
});
