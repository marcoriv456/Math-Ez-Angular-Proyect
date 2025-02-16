import {FractionValidator} from "./fraction.validator";
import {Term} from "../../../models/terms/term.model";
import {expect} from 'chai'


describe('Fraction validator: ', () => {
  it('Invalidates a "0/0" indetermination ', () => {
    const fractionTerm:Term= {type: 'fraction', numeratorChildren: [{type:'char',char:'0'}], denominatorChildren: [{type:'char',char:'0'}]}
    const validator=new FractionValidator(fractionTerm)

    const data=validator.validate()

    expect(data.messages).to.have.length(1)
    expect(data.type).to.equal("fully-invalid")
  });
});
