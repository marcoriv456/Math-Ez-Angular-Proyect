import {TermValidator} from "../../../abstracts/validator.abstract";
import {FractionDenominatorValidator} from "./fraction-denominator.validator";
import {Term} from "../../../../models/terms/term.model";
import {expect} from 'chai'


describe('Fraction denominator validator:', () => {
  it('Partially invalidates "1" as denominator', () => {
    const term:Term = {type: 'fraction', numeratorChildren: [], denominatorChildren: [{type:'char',char:'1'}]}
    const validator=new FractionDenominatorValidator(term)

    const data=validator.validate()

    expect(data.messages).to.have.length(1)
    expect(data.type).to.equal("partially-invalid")
  });

  it('Fully invalidates "0" as denominator', () => {
    const term:Term = {type: 'fraction', numeratorChildren: [], denominatorChildren: [{type:'char',char:'0'}]}
    const validator=new FractionDenominatorValidator(term)

    const data=validator.validate()

    expect(data.messages).to.have.length(1)
    expect(data.type).to.equal("fully-invalid")
  });

});
