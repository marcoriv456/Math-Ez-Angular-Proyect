import { Injectable } from '@angular/core';
import {VariableProvider} from "../../models/variable-provider.model";

@Injectable()
export class VariableProviderService {
  variableProvider!:VariableProvider
  constructor() { }

  setVariableProvider(provider:VariableProvider){
    this.variableProvider = provider;
  }

  get variableNames(){
    return this.variableProvider.variableNames;
  }

  getVariable(name:string){
    return this.variableProvider.getVariable(name)
  }

}
