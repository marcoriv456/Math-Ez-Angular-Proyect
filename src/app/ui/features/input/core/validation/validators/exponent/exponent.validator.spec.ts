import {ExponentValidator} from "./exponent.validator";
import {Term} from "../../../models/terms/term.model";
import {expect} from "chai";
import {expectPartiallyInvalid} from "../test/expect-partially-invalid.util";
import {expectValid} from "../test/expect-valid.util";

describe('Exponent validator: ', () => {

  it('Partially invalidates "0" as exponent', () => {
    const exponentTerm:Term={type:'exponent', exponentChildren:[{type:'char',char:'0'}]}
    const exponentValidator=new ExponentValidator(exponentTerm)

    const data=exponentValidator.validate()

    expectPartiallyInvalid(data)
  });

  it('Partially invalidates "1" as exponent', () => {
    const exponentTerm:Term={type:'exponent', exponentChildren:[{type:'char',char:'1'}]}
    const exponentValidator=new ExponentValidator(exponentTerm)

    const data=exponentValidator.validate()

    expectPartiallyInvalid(data)
  })

  it('Empty values are valid', () => {
    const exponentTerm:Term = {type:'exponent', exponentChildren:[]}
    const exponentValidator=new ExponentValidator(exponentTerm)

    const data=exponentValidator.validate()

    expectValid(data)
  });
});
