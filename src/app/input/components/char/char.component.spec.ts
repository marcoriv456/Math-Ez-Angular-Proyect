import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharComponent } from './char.component';
import {VariableProvider} from "../../models/variable-provider.model";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {
  ExperimentalVariableProviderService
} from "../../input-testing-environment/experimental-variable-provider.service";
import {By} from "@angular/platform-browser";

describe('CharComponent', () => {
  let component: CharComponent;
  let fixture: ComponentFixture<CharComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharComponent],
      providers:[VariableProviderService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
