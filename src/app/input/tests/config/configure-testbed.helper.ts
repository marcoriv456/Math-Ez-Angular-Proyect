import {TestBed} from "@angular/core/testing";
import {testingModuleConfig} from "./testing-module.config";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {
  ExperimentalVariableProviderService
} from "../../input-testing-environment/experimental-variable-provider.service";

export const configureTestbed= async (type:{new (...args:any[]):any}) => {
  await TestBed.configureTestingModule(testingModuleConfig)
    .compileComponents();

  let fixture = TestBed.createComponent(type);
  let component = fixture.componentInstance;

  fixture.detectChanges();
  TestBed.inject(VariableProviderService).setVariableProvider(new ExperimentalVariableProviderService())
  return {_fixture:fixture,_component:component}
}
