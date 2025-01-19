import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionComponent } from './function.component';
import {configureTestbed} from "../../tests/config/configure-testbed.helper";
import {runEditableElementTests} from "../../tests/editable-elements-shared-tests.spec..test";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";

describe('FunctionComponent', () => {
  let component: FunctionComponent;
  let fixture: ComponentFixture<FunctionComponent>;

  beforeEach(async () => {
    let {_fixture,_component}=await configureTestbed(FunctionComponent)
    component=_component
    fixture=_fixture
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the argument container', () => {
    expect(component.argumentContainer).toBeTruthy()
  });

  it('should have just one element', () => {
    expect(component.renderedChars.length).toBe(1);
  });

  describe('When the function has base terms: ', () => {
    beforeEach(()=>{
      fixture.componentRef.setInput('baseTerms', [])
      fixture.detectChanges()
    })

    it('should initialize the base container', () => {
      expect(component.baseComponent).toBeTruthy()
    })
  })

});
