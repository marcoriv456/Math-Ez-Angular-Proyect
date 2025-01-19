import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExponentComponent } from './exponent.component';
import {configureTestbed} from "../../tests/config/configure-testbed.helper";
import {runEditableElementTests} from "../../tests/editable-elements-shared-tests.spec..test";
import {parsePhrase} from "../../tests/utlis/parse-phrase.helper";

describe('ExponentComponent', () => {
  let component: ExponentComponent;
  let fixture: ComponentFixture<ExponentComponent>;


  beforeEach(async () => {
     let {_fixture,_component}= await configureTestbed(ExponentComponent)
    fixture=_fixture
    component=_component
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  runEditableElementTests<ExponentComponent>('ExponentComponent',ExponentComponent)

});
