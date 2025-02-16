import {ExponentValidator} from "./exponent.validator";
import {Term} from "../../../models/terms/term.model";
import {expect} from "chai";

describe('Exponent validator', () => {

  it('Partially invalidates "0" as exponent', () => {
    const exponentTerm:Term={type:'exponent', exponentChildren:[{type:'char',char:'0'}]}
    const exponentValidator=new ExponentValidator(exponentTerm)

    const data=exponentValidator.validate()

    expect(data.messages).to.have.length(1)
    expect(data.type).to.equal('partially-invalid')
  });

  it('Partially invalidates "1" as exponent', () => {
    const exponentTerm:Term={type:'exponent', exponentChildren:[{type:'char',char:'1'}]}
    const exponentValidator=new ExponentValidator(exponentTerm)

    const data=exponentValidator.validate()

    expect(data.messages).to.have.length(1)
    expect(data.type).to.equal("partially-invalid")
  });
});
