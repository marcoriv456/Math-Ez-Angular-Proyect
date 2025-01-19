import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootComponent } from './root.component';
import {configureTestbed} from "../../tests/config/configure-testbed.helper";

describe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;

  beforeEach(async () => {
    await configureTestbed(RootComponent)

    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only have one component', () => {
    expect(component.renderedChars.length).toBe(1);
  });

  describe('when theres radical terms defined ', () => {
    beforeEach(()=>{
      fixture.componentRef.setInput('radicalTerms',[])
      fixture.detectChanges();
    })

    it('should only have two components', () => {
      expect(component.renderedChars.length).toBe(2)
    });

    it('should initialize index component', () => {
      expect(component.indexComponent).toBeTruthy()
    });
  })

});
