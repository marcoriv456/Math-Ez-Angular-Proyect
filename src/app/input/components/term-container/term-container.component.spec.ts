import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermContainerComponent } from './term-container.component';
import {configureTestbed} from "../../tests/config/configure-testbed.helper";
import {Term} from "../../models/terms/term.model";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {parsePhrase} from "../../tests/utlis/parse-phrase.helper";
import {Component} from "@angular/core";

describe('TermContainerComponent', () => {
  let component: TermContainerComponent;
  let fixture: ComponentFixture<TermContainerComponent>;

  @Component({
    template: `
      <term-container
        [terms]="mockTerms"
        [parent]="mockParent">
      </term-container>
    `
  })
  class TestHostComponent {
    mockTerms: Term[] = [];
    mockParent: InputEditableElement = {} as InputEditableElement;
  }

  beforeEach(async () => {
    await configureTestbed(TermContainerComponent)

    fixture = TestBed.createComponent(TermContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize terms input', ()=>{
    const mockTerms: Term[] = [
      { type: 'root', rootChildren: parsePhrase('23') },
      { type: 'fraction', numeratorChildren:parsePhrase('12'), denominatorChildren:parsePhrase('24')  }
    ];

    component.terms = mockTerms;
    fixture.detectChanges();

    expect(component.terms).toEqual(mockTerms);
  })

  it('should have some rendered elements', () => {
    const mockTerms: Term[] = [
      { type: 'root', rootChildren: parsePhrase('23') },
      { type: 'fraction', numeratorChildren:parsePhrase('12'), denominatorChildren:parsePhrase('24')  }
    ];

    component.terms = mockTerms;
    fixture.detectChanges();

    expect(component.renderedChars).toBeTruthy()
    expect(component.renderedChars.length).toBe(2);
  });

  it('should handle empty terms array', () => {
    component.terms=[]
    fixture.detectChanges()

    expect(component.terms.length).toBe(0)
  });

  it('should handle null undefined inputs gracefully', () => {
    expect(() => {
      component.terms = null as any;
      component.parent = null as any;
      fixture.detectChanges();
    }).not.toThrow();
  });
});
