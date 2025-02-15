import { Injectable } from '@angular/core';
import {VariableProvider} from "../../models/variable-provider.model";
import {CharValidator} from "../../validation/validators/char.validator";

@Injectable()
export class VariableProviderService {
  variableProvider!:VariableProvider
  defaultVariables=new Map<string,any>([
    ['e',Math.exp(1)],
    ['π', Math.PI]
  ])
  constructor() {
    CharValidator.setVariableProvider(this)
  }

  setVariableProvider(provider:VariableProvider){
    this.variableProvider = provider;
  }

  get variableNames(){
    if(!this.variableProvider)
      return this.defaultVariableNames
    return [...this.variableProvider?.variableNames,...this.defaultVariableNames];
  }

  get defaultVariableNames(){
    return Array.from(this.defaultVariables.keys())
  }
  getVariable(name:string){
    return this.variableProvider.getVariable(name)
  }

}
