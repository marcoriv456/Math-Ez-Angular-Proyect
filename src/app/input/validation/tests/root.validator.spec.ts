import {RootComponent} from "../../components/root/root.component";
import {RootValidator} from "../validators/root.validator";
import {expectPartiallyInvalid} from "./utils/expect-partially-invalid.util";
import {expectInvalid} from "./utils/expect-invalid.util";
import {expectValid} from "./utils/expect-valid.util";

describe('Root validator: ', () => {
  const getRootComponent = (radicand: string, index?: string) => ({
      indexComponent: index ? {
        get toString(): string {
          return index
        }
      }:undefined,
      radicandComponent:{
        get toString(): string {
          return radicand
        }
      }
    }) as unknown as RootComponent

  const getRootValidator=(radicand: string, index?: string)=>new RootValidator(getRootComponent(radicand,index))

  it('Empty index and radicand are valid', () => {
    const validator=getRootValidator('','')

    const validationData = validator.validate()

    expectValid(validationData)
  });

  it('Not numerical index and radicand are valid', () => {
    const validator=getRootValidator('','')

    const validationData = validator.validate()

    expectValid(validationData)
  });

  it('"1" as radicand is partially invalid', () => {
    const validator=getRootValidator('1','')

    const validationData = validator.validate()

    expectPartiallyInvalid(validationData)
  });

  it('"0" as index is invalid', () => {
    const validator=getRootValidator('','0')

    const validationData = validator.validate()

    expectInvalid(validationData)
  });

  it('"1" as index is invalid', () => {
    const validator=getRootValidator('','1')

    const validationData = validator.validate()

    expectInvalid(validationData)
  });

  it('Negative radicand and even index are invalid', () => {
    const validator=getRootValidator('-10','2')

    const validationData = validator.validate()

    expectInvalid(validationData)
  });

});
