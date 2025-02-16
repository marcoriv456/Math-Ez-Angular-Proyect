import {CharValidator} from "./char.validator";
import {VariableProviderService} from "../../../services/variable-provider/variable-provider.service";
import {expect} from "chai"
describe('Char validator: ', () => {
  beforeEach(()=>{
    CharValidator['variableProvider']={
      get variableNames(): string[] {
        return ['A','B','C']
      }
    } as VariableProviderService
  })


  it('Invalidates characters that are not recognized by the variable provider.', () => {
    const validator=new CharValidator({type:'char',char:'D'})

    const data=validator.validate()

     expect(data.type).to.equal("fully-invalid")
  });

  it('Invalidates characters in a case-sensitive way', () => {
    const validator=new CharValidator({type:'char',char:'a'})

    const data=validator.validate()

    expect(data.type).to.equal("fully-invalid")
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


});
