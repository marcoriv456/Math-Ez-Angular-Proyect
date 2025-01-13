import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import {InputTestingEnvironmentComponent} from "./input-testing-environment/input-testing-environment.component";
import {CharComponent} from "./components/char/char.component";
import {FractionComponent} from "./components/fraction/fraction.component";
import {InputTermDirective} from "./directives/input-term/input-term.directive";
import {FractionChildComponent} from "./components/fraction/fraction-child/fraction-child.component";
import {ExponentComponent} from "./components/exponent/exponent.component";
import {RootComponent} from "./components/root/root.component";
import {FunctionComponent} from "./components/function/function.component";
import {TermContainerComponent} from "./components/term-container/term-container.component";
import {TermArgumentComponent} from "./components/term-argument/term-argument.component";
import {EditableTermContainerComponent} from "./components/editable-term-container/editable-term-container.component";
import {ParenthesisComponent} from "./components/parenthesis/parenthesis.component";
import {TermValidationWarningComponent} from "./components/term-validation-warning/term-validation-warning.component";
import {CommonModule} from "@angular/common";
import {CharClickedNotifierService} from "./services/char-clicked-notifier/char-clicked-notifier.service";
import {WarningsService} from "./services/warnings/warnings.service";
import {VariableProviderService} from "./services/variable-provider/variable-provider.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Term} from "./models/terms/term.model";
import {VariableProvider} from "./models/variable-provider.model";
import {ExperimentalVariableProviderService} from "./input-testing-environment/experimental-variable-provider.service";
import {inject, input} from "@angular/core";
import {SpecialCharFinder} from "./classes/special-char-finder.class";

fdescribe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  let variableProvider = new ExperimentalVariableProviderService()
  let variableProviderContainer: VariableProviderService;

  let recognizableFunctions:string[]=[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InputComponent,
        InputTestingEnvironmentComponent,
        CharComponent,
        FractionComponent,
        InputTermDirective,
        FractionChildComponent,
        ExponentComponent,
        RootComponent,
        FunctionComponent,
        TermContainerComponent,
        TermArgumentComponent,
        EditableTermContainerComponent,
        ParenthesisComponent,
        TermValidationWarningComponent
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule
      ],
      providers: [
        CharClickedNotifierService,
        WarningsService,
        VariableProviderService,
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('variableProvider', variableProvider)

    variableProviderContainer = TestBed.inject(VariableProviderService)
    spyOn(variableProviderContainer, 'setVariableProvider').and.callThrough()

    component = fixture.componentInstance;
    recognizableFunctions=component.recognizableFunctions

    fixture.detectChanges();
  });

  //--------------------- INITIALIZATION TESTS---------------------
  describe('Component initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should init variable provider object', () => {
      expect(component.variableProvider).toBeTruthy()
    })

    it('should set the variable provider in the container service', () => {
      expect(variableProviderContainer.setVariableProvider).toHaveBeenCalled()
    });
  })
  //--------------------- INITIALIZATION TESTS---------------------

  //--------------------- USER INTERACTION TESTS---------------------
  describe('User interactions', () => {
    const dispatchEvents = (...events: Event[]) => {
      events.forEach(event => component.ref.dispatchEvent(event))
    }

    const pressKeys = (...keys: string[]) => {
      dispatchEvents(...keys.map(key => new KeyboardEvent('keydown', {key})))
    }

    const moveForward = (steps=1) => {
      for(let i=0; i<steps;i++)
        pressKeys('ArrowRight')
      fixture.detectChanges()
    }

    const moveBackward = (steps=1) =>{
      for(let i=0; i<steps;i++)
        pressKeys('ArrowLeft')
      fixture.detectChanges()
    }

    const pressCtrlKeyAnd = (...keys:string[]) => {
      keys.forEach((key)=>dispatchEvents(new KeyboardEvent('keydown',{key, ctrlKey:true})))
    }

    const expectTerms = (...expectedTerms: Term[]) => {
      expect(component.getTerms()).toEqual(expectedTerms)
    }

    it('should lost focus when tab key is clicked', () => {
      pressKeys('Tab')

      expect(document.activeElement).not.toEqual(component.ref)
    });

    describe('Character adding on user interaction', () => {

      describe('simple character adding', () => {

        it("should add a character, when the keydown event is triggered and the key's length is equal to 1", () => {
          pressKeys('a')

          expectTerms({type: 'char', char: 'a'})
        })

        it('when multiple character keys are pressed, then it should add multiple characters', () => {
          pressKeys(..."hello")

          expectTerms(
            {type: 'char', char: 'h'},
            {type: 'char', char: 'e'},
            {type: 'char', char: 'l'},
            {type: 'char', char: 'l'},
            {type: 'char', char: 'o'},
          )
        });
      })

      describe('Fraction adding', () => {
        const addSlash = () => pressKeys('/')


        it('having no elements written already, when a "/" char is typed, should add an empty fraction', () => {
          addSlash()

          expectTerms({type: 'fraction', denominatorChildren: [], numeratorChildren: []})
        });

        it('having some elements added already and the caret placed in front of them, when a "/" character is typed. should add a fraction with a filled numerator', () => {
          pressKeys(...'num')

          addSlash()

          expectTerms({
            type: 'fraction',
            numeratorChildren: [
              {type: 'char', char: 'n'},
              {type: 'char', char: 'u'},
              {type: 'char', char: 'm'},
            ],
            denominatorChildren: [],
          })
        });

        it('having some elements in already and the caret placed before them, when the "/" character is typed, then it should add a fraction with a filled denominator ', () => {
          pressKeys(...'den', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft',)

          addSlash()

          expectTerms({
            type: "fraction",
            numeratorChildren: [],
            denominatorChildren: [
              {type: "char", char: 'd'},
              {type: "char", char: 'e'},
              {type: "char", char: 'n'},
            ]
          });
        })

        it('having some elements in already and the caret placed in the middle of them, when the "/" character is , then it should add a full filed fraction', () => {
          pressKeys(...'num',...'den', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft')

          addSlash()

          expectTerms({
            type: "fraction",
            numeratorChildren: [
              {type: "char", char: 'n'},
              {type: "char", char: 'u'},
              {type: "char", char: 'm'},
            ],
            denominatorChildren: [
              {type: "char", char: 'd'},
              {type: "char", char: 'e'},
              {type: "char", char: 'n'},
            ]
          })
        });
      })

      describe('Exponent adding', ()=>{
        const pressExponentShortcut = ()=>{
          dispatchEvents(new KeyboardEvent('keydown', {key:'e', ctrlKey:true}))
        }

        it('when the user presses the exponent shortcut, it should add an exponent', () => {
          pressExponentShortcut()

          expectTerms({type:'exponent', exponentChildren:[]})
        });

        it('given a recently added exponent,when the user doesnt moves to anywhere else, it should add some terms inside the exponent', () => {
          pressExponentShortcut()

          pressKeys(...'hello')

          expectTerms({
            type:'exponent',
            exponentChildren:[
              {type:'char',char:'h'},
              {type:'char',char:'e'},
              {type:'char',char:'l'},
              {type:'char',char:'l'},
              {type:'char',char:'o'}
            ]
          })
        });
      })

      describe('Root adding', ()=>{
        const pressSimpleRootShortcut = ()=> {
          dispatchEvents(new KeyboardEvent('keydown', {key:'r', ctrlKey:true}))
        }
        const pressEditableBaseRootShortcut = ()=> {
          dispatchEvents(new KeyboardEvent('keydown', {key:'r', altKey:true}))
        }

        it('when the user presses ctrl + r, it should add a simple root', () => {
          pressSimpleRootShortcut()

          expectTerms({
            type:'root',
            rootChildren:[]
          })
        });

        it('when the user presses alt + r, it should add an editable base root', () => {
          pressEditableBaseRootShortcut()

          expectTerms({
            type:'root',
            rootChildren:[],
            radicalTerms:[]
          })
        });
      })

      describe('Parenthesis adding', ()=>{

        it('when the user presses the opened parenthesis character, it should add am opened parenthesis character', () => {
          pressKeys('(')

          expectTerms({type:'char',char:'('})
        });

        it('when the user presses the closed parenthesis character, it should add a closed parenthesis character', () => {
          pressKeys(')')

          expectTerms({type:'char', char:')'})
        });

        it('having an opened parenthesis already typed, when the user types a closed parenthesis, it should add an empty parenthesis term', () => {
          pressKeys('(',')')

          expectTerms({type:'parenthesis', parenthesisChildren:[]})
        });

        it('having an opened parenthesis and some elements next to it already typed, when the user types a closed parenthesis, it should add a filled parenthesis term', () => {
          pressKeys('(',...'hello', ')')

          expectTerms({
            type:'parenthesis',
            parenthesisChildren:[
              {type:'char',char:'h'},
              {type:'char',char:'e'},
              {type:'char',char:'l'},
              {type:'char',char:'l'},
              {type:'char',char:'o'},
            ]
          })
        });

        it('having some elements and a closed parenthesis next to it already typed, when the user types an opened parenthesis before them, it should add a filled parenthesis term', () => {
          pressKeys(...'hello',')','ArrowLeft','ArrowLeft','ArrowLeft','ArrowLeft','ArrowLeft','ArrowLeft','(')

          expectTerms({
            type:'parenthesis',
            parenthesisChildren:[
              {type:'char',char:'h'},
              {type:'char',char:'e'},
              {type:'char',char:'l'},
              {type:'char',char:'l'},
              {type:'char',char:'o'},
            ]
          })
        });
      })

      describe('Special char adding', () => {
        it('when the user presses the ctrl + p shortcut, it should add a pi character', () => {
          dispatchEvents(new KeyboardEvent('keydown',{key:'p',ctrlKey:true}))

          expectTerms({type:'char',char:'π'})
        });
      });

      describe(`Functions adding`,()=>{
        it('when the user writes a recognizable function, it should add it', () => {
          recognizableFunctions.forEach((functionName)=>{
            pressKeys(...functionName)

            expectTerms({
              type:'function',
              functionName,
              functionChildren:[],
              argumentTerms: functionName == 'log' ? []:undefined
            })

            pressKeys('Backspace')
          })
        });

        it('having a parenthesis next to the caret, when the user writes a recognizable function, it should add the function with the parenthesis elements inside it', ()=>{
          recognizableFunctions.forEach((functionName)=>{
            pressKeys(...'(hello)')
            dispatchEvents(new KeyboardEvent('keydown',{key:'ArrowLeft', ctrlKey:true}))

            pressKeys(...functionName)

            expectTerms({
              type:'function',
              functionName,
              functionChildren:[
                {type:'char',char:'h'},
                {type:'char',char:'e'},
                {type:'char',char:'l'},
                {type:'char',char:'l'},
                {type:'char',char:'o'},
              ],
              argumentTerms: functionName == 'log' ? []:undefined
            })

            pressKeys('Backspace')
          })

        });

      })

    })

    describe('Caret positioning', () => {
      let caretElement=document.querySelector('#caret-container') as HTMLElement

      const getCaretPositionX = ()=>{
        let caretLeftStyle= caretElement?.style.left||""
        return +caretLeftStyle.slice(0,caretLeftStyle.length-2)||0
      }

      const getRenderedCharacters = () =>{
        return component.ref.querySelectorAll("char")
      }

      const getLeftBorderPositionOfChar = (index:number) => {
        return getRenderedCharacters().item(index).getBoundingClientRect().left
      }

      const getRightBorderPositionOfChar = (index:number) => {
        let char = getRenderedCharacters().item(index) as HTMLElement
        return char.getBoundingClientRect().left + char.offsetWidth
      }

      const expectCaretHorizontalPosition = (expectedPositionX:number) => {
        fixture.detectChanges()
        expect(getCaretPositionX()).toBeCloseTo(expectedPositionX,0)
      }

      beforeEach(()=>{
        caretElement=document.querySelector('#caret-container') as HTMLElement
      })

      it('when the user clicks the input, it should move caret to the end', () => {
        dispatchEvents(new MouseEvent('click'))
        pressKeys(...'hello')


        expectCaretHorizontalPosition(getRightBorderPositionOfChar(4))
      });


      describe('Caret movement across single characters', ()=>{

        it('having "hello" already written, when the user presses the left arrow key 5 times, it should move the caret to the left border of the input',  () => {
          pressKeys(...'hello',)

          moveBackward(5)

          expectCaretHorizontalPosition(0)
        });

        it('having "hello" already written and the caret placed in the first position, when the user presses the right arrow key 5 times, it should move to the last element position', () => {
          pressKeys(...'hello',)
          moveBackward(5)

          moveForward(5)

          expectCaretHorizontalPosition(getRightBorderPositionOfChar(4))
        });

        it('having no element already written, when the user presses the left arrow (whatever the times it does), it should stay in the first position', () => {

          moveBackward(10)

          expect(getCaretPositionX()).toBeCloseTo(0)
        });

        it('having no element already written, when the user presses the right arrow (whatever the times it does), it should stay in the first position', () => {

          moveForward(10)

          expectCaretHorizontalPosition(0)
        });
      })

      describe('Caret movement in special keys', () => {
        beforeEach(()=>{
          pressKeys(...'12+13')
        })

        it('having irregular characters already written and the caret placed in the first position, when the user preses ctrl + right arrow, it should move the caret back of the next irregular character', () => {
          moveBackward(5)

          pressCtrlKeyAnd('ArrowRight')

          expectCaretHorizontalPosition(getLeftBorderPositionOfChar(2))
        });
        it('having irregular characters already written, when the user preses ctrl + left, it should move the caret next to the previous irregular character', () => {
          pressCtrlKeyAnd('ArrowLeft')

          expectCaretHorizontalPosition(getRightBorderPositionOfChar(2))
        });

        it('having the caret placed next to an irregular character, when the user presses ctrl + left, it should move the caret back of the irregular character', () => {
          moveBackward(2)

          pressCtrlKeyAnd('ArrowLeft')

          expectCaretHorizontalPosition(getLeftBorderPositionOfChar(2))
        });

        it('having the caret placed behind an irregular character, when the user presses ctrl + right, it should move the caret next to the irregular character', () => {
          moveBackward(3)

          pressCtrlKeyAnd('ArrowRight')

          expectCaretHorizontalPosition(getRightBorderPositionOfChar(2))
        });

        it('having some elements already written and the caret placed anywhere, when the user presses ctrl + end, it should move the caret to the inputs end', () => {
          moveBackward(4)

          pressCtrlKeyAnd('End')

          expectCaretHorizontalPosition(getRightBorderPositionOfChar(4))
        });

        it('having some elements already written and the caret placed anywhere, when the user presses ctrl + home, it should move the caret to the inputs start', () => {
          pressCtrlKeyAnd('Home')

          expectCaretHorizontalPosition(0)
        });
      });

      describe('Caret movement inside contexts', ()=>{

        const getCharParentHeight = (index:number) => {
          return (getRenderedCharacters().item(index) as HTMLElement).offsetHeight
        }

        const getCaretHeight = () => {
          let caretHeightStyle = caretElement.style.height
          return +caretHeightStyle.slice(0,caretHeightStyle.length-2)
        }

        const expectCaretHeight = (heightToExpect:number) => {
          expect(getCaretHeight()).toBeCloseTo(heightToExpect,0)
        }

        const caretVerticalPosition = () => {
          return caretElement.getBoundingClientRect().top
        }

        const expectCaretVerticalPosition = (expectedPositionY:number) => {
          fixture.detectChanges()
          expect(caretVerticalPosition()).toBeCloseTo(expectedPositionY,0)
        }

        const getCharParentVerticalPosition = (index:number) => {
          return getRenderedCharacters().item(index).parentElement?.getBoundingClientRect().top||0
        }

        const helloInTerms:Term[]=[
          {type:'char', char:'h'},
          {type:'char', char:'e'},
          {type:'char', char:'l'},
          {type:'char', char:'l'},
          {type:'char', char:'o'}
        ]

        beforeEach(()=>{
          caretElement.style.transition='none'
        })

        describe('When the user writes something inside a fraction', ()=>{
          const expectedTerm:Term={
            type:'fraction',
            numeratorChildren:[
              {type:'char',char:'2'}
            ],
            denominatorChildren:[
              {type:'char',char:'1'},
              {type:'char',char:'2'},
              {type:'char',char:'1'},
              {type:'char',char:'2'}
            ]
          }

          beforeEach(()=>{
            pressKeys(...'2/1212')
            fixture.detectChanges()

            expectTerms(expectedTerm)
          })

          it('It should modify the caret horizontal position', () => {
            expectCaretHorizontalPosition(getRightBorderPositionOfChar(4))
          });

          it('It should modify the caret vertical position to the same the character parent container has', () => {
            expectCaretVerticalPosition(getCharParentVerticalPosition(2))
          });

          it('It should modify the caret height', () => {
            expectCaretHeight(getCharParentHeight(2))
          });

        })

        describe("When the user writes something inside an exponent", ()=>{
          const expectedTerm:Term={
            type:'exponent',
            exponentChildren:helloInTerms
          }

          beforeEach(()=>{
            pressCtrlKeyAnd('e')
            pressKeys(...'hello')

            expectTerms(expectedTerm)
          })

          it('it should modify the caret height', () => {
            expectCaretHeight(getCharParentHeight(4))
          });

          it('It should modify the caret vertical position to the same the character parent container has', () => {
            expectCaretVerticalPosition(getCharParentVerticalPosition(4))
          });

          it('when the user writes something inside an exponent, it should modify the caret position', () => {
            expectCaretHorizontalPosition(getRightBorderPositionOfChar(4))
          });
        })

        describe("Caret changes when writing inside a function", ()=>{
          const expectedTerm:Term= {
            type:'function',
            functionName:'cos',
            functionChildren:helloInTerms,
            argumentTerms:undefined
          }

          beforeEach(()=>{
            pressKeys(...'cos',...'hello')
            expectTerms(expectedTerm)
          })

          it('when the user writes something inside a function, it should modify the caret height', () => {
            expectCaretHeight(getCharParentHeight(4))
          });

          it('It should modify the caret vertical position to the same the character parent container has', () => {
            expectCaretVerticalPosition(getCharParentVerticalPosition(4))
          });

          it('when the user writes something inside a function, it should modify the caret position', () => {
            expectCaretHorizontalPosition(getRightBorderPositionOfChar(4))
          });
        })

        describe('Caret changes when writing inside a parenthesis', () => {
          const expectedTerm:Term= {
            type:'parenthesis',
            parenthesisChildren:helloInTerms
          }
          beforeEach(()=>{
            pressKeys(...'(hello)', 'ArrowLeft')
            expectTerms(expectedTerm)
          })

          it('when the user writes something inside a parenthesis, it should modify the caret height', () => {
            expectCaretHeight(getCharParentHeight(4))
          });

          it('when the user writes something inside a parenthesis, it should modify the caret position', () => {
            expectCaretHorizontalPosition(getRightBorderPositionOfChar(4))
          });
        });

        describe('Caret changes when writing inside a root', () => {
          const getRootTopBorderAnchor = () => {
            const computedBorderWidth =  component.ref.querySelector('root')?.querySelector('editable-term-container')?.computedStyleMap().get('border-top-width')?.toString()
            if(!computedBorderWidth)
              return 0
            return +computedBorderWidth.slice(0,computedBorderWidth.length-2)
          }

          describe('Simple root', () => {
            const expectedTerm:Term= {
              type:'root',
              rootChildren:helloInTerms
            }

            beforeEach(()=>{
              pressCtrlKeyAnd('r')
              pressKeys(...'hello')
              expectTerms(expectedTerm)
            })

            it('should modify the caret height', () => {
              expectCaretHeight(getCharParentHeight(4)+getRootTopBorderAnchor())
            });

            it('It should modify the caret vertical position to the same the character parent container has', () => {
              expectCaretVerticalPosition(getCharParentVerticalPosition(4)-getRootTopBorderAnchor())
            });

            it('should modify the caret position', () => {
              expectCaretHorizontalPosition(getRightBorderPositionOfChar(4))
            });
          });

          describe('Editable index root', () => {
            const expectedTerm:Term= {
              type:'root',
              rootChildren:[],
              radicalTerms:helloInTerms
            }

            beforeEach(()=>{
              dispatchEvents(new KeyboardEvent('keydown',{key:'r',altKey:true}))
              pressKeys(...'hello')
              expectTerms(expectedTerm)
            })

            it('should modify the caret height', () => {
              expectCaretHeight(getCharParentHeight(4))
            });

            it('It should modify the caret vertical position to the same the character parent container has', () => {
              expectCaretVerticalPosition(getCharParentVerticalPosition(4))
            });

            it('should modify the caret position', () => {
              expectCaretHorizontalPosition(getRightBorderPositionOfChar(4))
            });
          });

        });

      });

    });

    describe('Term removal on user interactions: ', () => {
      const remove = (count=1) => {
        for (let i=0; i<count; i++)
          pressKeys('Backspace')
      }

      const parsePhrase:(phrase:string)=>Term[] = (phrase:string) => {
        return [...phrase].map(char=> {
          return {type:'char',char}
        })
      }

      describe('Remove simple characters:', () => {
        beforeEach(()=>{
          pressKeys(..."hello world")
        })

        it('should remain the phrase "hello"', () => {
          remove(6)

          expectTerms(...parsePhrase("hello"))
        })

        it('should remain the phrase world', () => {
          moveBackward(5)
          remove(6)

          expectTerms(...parsePhrase('world'))
        });

      });

      describe('Remove using ctrl key: ', () => {

        beforeEach(()=>{
          pressKeys(..."hello+world")
        })

        it('Should remain "hello+"', () => {
          pressCtrlKeyAnd('Backspace')

          expectTerms(...parsePhrase('hello+'))
        });

        it('Should remain "hello"', () => {
          pressCtrlKeyAnd('Backspace', 'Backspace')

          expectTerms(...parsePhrase('hello'))
        });

        it('should remain "helloworld"', () => {
          moveBackward(5)

          pressCtrlKeyAnd('Backspace')

          expectTerms(...parsePhrase('helloworld'))
        });

        it('should remain "+world"', () => {
          moveBackward(6)

          pressCtrlKeyAnd('Backspace')

          expectTerms(...parsePhrase('+world'))
        });

        it('should remain "world"', () => {
          moveBackward(5)

          pressCtrlKeyAnd('Backspace','Backspace')

          expectTerms(...parsePhrase('world'))
        });

        it('should remain nothing', () => {
          pressCtrlKeyAnd('Backspace','Backspace','Backspace')

          expectTerms()
        });
      });

    });
    //--------------------- USER INTERACTION TESTS---------------------


  })
})
