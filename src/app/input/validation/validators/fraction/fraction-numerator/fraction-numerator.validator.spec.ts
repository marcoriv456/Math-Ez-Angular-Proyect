import {TermValidator} from "../../../abstracts/validator.abstract";
import {FractionValidator} from "../fraction.validator";
import {FractionNumeratorValidator} from "./fraction-numerator.validator";
import {Term} from "../../../../models/terms/term.model";
import {expectPartiallyInvalid} from "../../test/expect-partially-invalid.util";

describe('Fraction numerator', () => {
  it('Partially invalidates "0" as numerator.', () => {
    const term:Term = {type: 'fraction', numeratorChildren: [{type:'char',char:'0'}], denominatorChildren: []}
    const validator=new FractionNumeratorValidator(term)

    const data=validator.validate()

    expectPartiallyInvalid(data)
  });
});
