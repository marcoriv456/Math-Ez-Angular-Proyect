import {InputEditableElement} from "../directives/input-editable-element/input-editable-element.directive";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {EditableTermContainerComponent} from "../components/editable-term-container/editable-term-container.component";
import {TermContainerComponent} from "../components/term-container/term-container.component";
import {parsePhrase} from "./utlis/parse-phrase.helper";
import {CharComponent} from "../components/char/char.component";
import {configureTestbed} from "./config/configure-testbed.helper";

export function runEditableElementTests<T extends InputEditableElement>(name:string, type:{new ():T}) {
  let component: T;
  let fixture: ComponentFixture<T>;

  describe(`${name} - Editable Elements Test suite`, ()=>{
    beforeEach(async() => {
      fixture = TestBed.createComponent(type);
      component = fixture.componentInstance;
      fixture.detectChanges();

      fixture.componentRef.setInput('terms', [])


      spyOn(component as any, 'updateValidation')
    });

    it(`should get an ${name} instance.` , () => {
      expect(component).toBeTruthy();
    });

    describe('Term edition functions: ', () => {
      afterEach(()=>{
        expect(component.updateValidation).toHaveBeenCalled()
      })

      describe('Append function tests: ', ()=>{

        it('should write the elements in the terms array', () => {
          component.append(parsePhrase('1997'))

          expect(component.terms).toEqual(parsePhrase('1997'))
        });

        it('being the caret index 4 and having some terms already added, it should add the terms from that index', () => {
          component.append(parsePhrase('hello morning'))
          component.caretIndex=5
          component.append(parsePhrase(' good'))

          expect(component.terms).toEqual(parsePhrase('hello good morning'))
        });

        it('being the caret in the last index and having some terms already added, it should add he terms next to the previous elements', () => {
          component.append(parsePhrase('hello good'))
          component.caretIndex=10
          component.append(parsePhrase(' morning'))

          expect(component.terms).toEqual(parsePhrase('hello good morning'))
        });
      })

      describe('Delete function tests: ', ()=>{
        it('shouldn\'t throw an error', ()=>{
          component.delete(0,10)
        })

        it('should remove the word "hello"', () => {
          component.append(parsePhrase('hello good morning'))
          component.delete(0,6)

          expect(component.terms).toEqual(parsePhrase('good morning'))
        });

        it('should remove the word "good"', () => {
          component.append(parsePhrase('hello good morning'))
          component.delete(5, 5)

          expect(component.terms).toEqual(parsePhrase('hello morning'))
        });
      })

      describe('Replace function tests: ', () => {
        beforeEach(()=>{
          component.append(parsePhrase("hello good morning"))
        })
        it('should replace "good" for "bad"', () => {
          component.replace(6,4,parsePhrase('bad'))

          expect(component.terms).toEqual(parsePhrase("hello bad morning"))
        });

        it('should replace "morning" for "night"', () => {
          component.replace(11,7,parsePhrase('night'))

          expect(component.terms).toEqual(parsePhrase("hello good night"))
        });

        it('should replace "hello" for "goodbye"', () => {
          component.replace(0,5,parsePhrase('goodbye'))

          expect(component.terms).toEqual(parsePhrase('goodbye good morning'))
        });
      });

    });

    describe('Obtaining rendered chars :', () => {
        const testingPhrase="hello"
        beforeEach(()=>{
          component.append(parsePhrase(testingPhrase))
          fixture.detectChanges()
        })

        it('writing some elements, it should have some rendered elements', () => {
          expect(component.renderedChars.length).toBe(5)
        });

        it('shouldn\'t return any character as undefined', () => {
          [...testingPhrase].forEach((char,index)=>expect(component.getRenderedChar(index)).toBeTruthy())
        });

        it('should return every single character in the phrase', () => {
          [...testingPhrase].forEach((char,index)=>expect(component.getRenderedChar(index)?.char).toBe(char))
        });
      });

    describe('Computed properties: ', () => {
      it('should determine correctly whether it is empty or not', () => {
        component.terms=[]
        expect(component['isEmpty']).toBeTrue()

        component.terms=parsePhrase('hello')
        expect(component['isEmpty']).toBeFalse()
      });
    });
  })

}
