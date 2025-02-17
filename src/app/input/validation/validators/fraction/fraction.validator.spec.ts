import {FractionValidator} from "./fraction.validator";
import {Term} from "../../../models/terms/term.model";
import {expect} from 'chai'
import {expectInvalid} from "../test/expect-invalid.util";
import {expectValid} from "../test/expect-valid.util";


describe('Fraction validator: ', () => {
  it('Invalidates a "0/0" indetermination ', () => {
    const fractionTerm:Term= {type: 'fraction', numeratorChildren: [{type:'char',char:'0'}], denominatorChildren: [{type:'char',char:'0'}]}
    const validator=new FractionValidator(fractionTerm)

    const data=validator.validate()

    expectInvalid(data)
  });

  it('Empty values are valid', () => {
    const fractionTerm:Term= {type: 'fraction', numeratorChildren: [], denominatorChildren: []}
    const validator=new FractionValidator(fractionTerm)

    const data=validator.validate()

    expectValid(data)
  });
});
