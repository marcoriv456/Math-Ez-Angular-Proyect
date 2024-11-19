import { Injectable } from '@angular/core';
import {VariableProvider} from "../models/variable-provider.model";

@Injectable({
  providedIn: 'root'
})
export class ExperimentalVariableProviderService extends VariableProvider{

  override variables=new Map<string,any>([
    ['A',23],
    ['B',23],
    ['C',23],
  ])

}
