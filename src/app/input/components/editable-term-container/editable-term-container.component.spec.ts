import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditableTermContainerComponent} from './editable-term-container.component';
import {runEditableElementTests} from "../../tests/editable-elements-shared-tests.spec..test";
import {testingModuleConfig} from "../../tests/config/testing-module.config";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {
  ExperimentalVariableProviderService
} from "../../input-testing-environment/experimental-variable-provider.service";

describe('EditableTermContainerComponent', () => {
  let component: EditableTermContainerComponent;
  let fixture: ComponentFixture<EditableTermContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testingModuleConfig)
    .compileComponents();

    fixture = TestBed.createComponent(EditableTermContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    TestBed.inject(VariableProviderService).setVariableProvider(new ExperimentalVariableProviderService())
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  runEditableElementTests<EditableTermContainerComponent>('EditableTermContainerComponent')

});
