import {FractionValidator} from "./fraction.validator";
import {Term} from "../../../models/terms/term.model";
import {expect} from 'chai'
import {expectInvalid} from "../test/expect-invalid.util";


describe('Fraction validator: ', () => {
  it('Invalidates a "0/0" indetermination ', () => {
    const fractionTerm:Term= {type: 'fraction', numeratorChildren: [{type:'char',char:'0'}], denominatorChildren: [{type:'char',char:'0'}]}
    const validator=new FractionValidator(fractionTerm)

    const data=validator.validate()

    expectInvalid(data)
  });
});
