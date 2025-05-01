import {CharValidator} from "./char.validator";
import {VariableHandlerService} from "../../../services/variable-handler/variable-handler.service";
import {expect} from "chai"
import {expectInvalid} from "../test/expect-invalid.util";
import {expectValid} from "../test/expect-valid.util";
describe('Char validator: ', () => {
  beforeEach(()=>{
    CharValidator['variableProvider']={
      get variableNames(): string[] {
        return ['A','B','C']
      }
    } as VariableHandlerService
  })


  it('Invalidates characters that are not recognized by the variable provider.', () => {
    const validator=new CharValidator({type:'char',char:'D'})

    const data=validator.validate()

     expectInvalid(data)
  });

  it('Invalidates characters in a case-sensitive way', () => {
    const validator=new CharValidator({type:'char',char:'a'})

    const data=validator.validate()

    expectInvalid(data)
  });

  it('Returns one fully invalid message', () => {
    const validator=new CharValidator({type:'char',char:'F'})

    const data=validator.validate()

    expect(data.messages).to.have.length(1)
    expect(data.messages[0].type).to.equal("fully-invalid")
  });


  it('Generates a custom invalidation message', () => {
    const validator=new CharValidator({type:'char',char:'F'})

    const data=validator.validate()

    expect(data.messages[0].message).to.contain('"F"')
  });

  it('Numbers are valid', () => {
    const validator=new CharValidator({type:'char',char:'7'})

    const data=validator.validate();

    expectValid(data)
  });

  it('Special characters are valid', () => {
    const validator=new CharValidator({type:'char',char:'*'})

    const data=validator.validate();

    expectValid(data)
  });
});
