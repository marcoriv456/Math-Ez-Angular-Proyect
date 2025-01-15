import {InputComponent} from "../input.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Term} from "../models/terms/term.model";
import {InputTestingEnvironmentComponent} from "../input-testing-environment/input-testing-environment.component";
import {CharComponent} from "../components/char/char.component";
import {FractionComponent} from "../components/fraction/fraction.component";
import {InputTermDirective} from "../directives/input-term/input-term.directive";
import {FractionChildComponent} from "../components/fraction/fraction-child/fraction-child.component";
import {ExponentComponent} from "../components/exponent/exponent.component";
import {RootComponent} from "../components/root/root.component";
import {FunctionComponent} from "../components/function/function.component";
import {TermContainerComponent} from "../components/term-container/term-container.component";
import {TermArgumentComponent} from "../components/term-argument/term-argument.component";
import {EditableTermContainerComponent} from "../components/editable-term-container/editable-term-container.component";
import {ParenthesisComponent} from "../components/parenthesis/parenthesis.component";
import {TermValidationWarningComponent} from "../components/term-validation-warning/term-validation-warning.component";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CharClickedNotifierService} from "../services/char-clicked-notifier/char-clicked-notifier.service";
import {WarningsService} from "../services/warnings/warnings.service";
import {VariableProviderService} from "../services/variable-provider/variable-provider.service";
import {ExperimentalVariableProviderService} from "../input-testing-environment/experimental-variable-provider.service";

describe('InputComponent - Character adding on user interaction:', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let caretElement:HTMLElement

  let recognizableFunctions:string[]=[]

  const dispatchEvents = (...events: Event[]) => {
    events.forEach(event => component.ref.dispatchEvent(event))
  }

  const pressKeys = (...keys: string[]) => {
    dispatchEvents(...keys.map(key => new KeyboardEvent('keydown', {key})))
  }

  const pressCtrlKeyAnd = (...keys:string[]) => {
    keys.forEach((key)=>dispatchEvents(new KeyboardEvent('keydown',{key, ctrlKey:true})))
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


  const getCaretPositionX = ()=>{
    let caretLeftStyle= caretElement?.style.left||""
    return +caretLeftStyle.slice(0,caretLeftStyle.length-2)||0
  }

  const getRenderedCharacters = () =>{
    return component.ref.querySelectorAll("char")
  }

  const getRightBorderPositionOfChar = (index:number) => {
    let char = getRenderedCharacters().item(index) as HTMLElement
    return char.getBoundingClientRect().left + char.offsetWidth
  }


  const expectTerms = (...expectedTerms: Term[]) => {
    expect(component.getTerms()).toEqual(expectedTerms)
  }

  const expectCaretHorizontalPosition = (expectedPositionX:number) => {
    fixture.detectChanges()
    expect(getCaretPositionX()).toBeCloseTo(expectedPositionX,0)
  }


  const remove = (count=1) => {
    for (let i=0; i<count; i++)
      pressKeys('Backspace')
  }

  const parsePhrase:(phrase:string)=>Term[] = (phrase:string) => {
    return [...phrase].map(char=> {
      return {type:'char',char}
    })
  }


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
    fixture.componentRef.setInput('variableProvider', new ExperimentalVariableProviderService())

    component = fixture.componentInstance;
    recognizableFunctions=component.recognizableFunctions

    fixture.detectChanges();
    caretElement=document.querySelector('#caret-container') as HTMLElement
  });

  describe('Term removal on user interactions: ', () => {
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

      it('should remain nothing', () => {
        remove(11)

        expectTerms()
      });

      it("shouldn't throw an error" , () => {
        remove(20)

        expectTerms()
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

      it("shouldn't throw an error" , () => {
        pressCtrlKeyAnd('Backspace','Backspace','Backspace','Backspace','Backspace','Backspace')

        expectTerms()
      });
    });

    describe('Remove editable terms: ', () => {

      describe('Fraction removal: ', () => {

        it('being outside, it should remove the complete fraction', () => {
          pressKeys(...'5/23')
          expectTerms({type:'fraction', numeratorChildren:parsePhrase('5'),denominatorChildren:parsePhrase('23')})
          moveForward(1)

          remove(1)

          expectTerms()
          expectCaretHorizontalPosition(0)
        });

        describe('Being inside the numerator: ', () => {

          it('in first index, it should remove the fraction ', () => {
            pressKeys('/')
            expectTerms({type:'fraction',denominatorChildren:[],numeratorChildren:[]})

            remove(1)

            expectCaretHorizontalPosition(0)
            expectTerms()
          });

          it('in first index and having elements only in the denominator, it should remove the fraction, but the terms inside of it should remain there', () => {
            pressKeys('/','ArrowRight', ...'24')
            expectTerms({type:'fraction',numeratorChildren:[],denominatorChildren:parsePhrase('24')})
            moveBackward(3)

            remove(1)

            expectCaretHorizontalPosition(getRightBorderPositionOfChar(1))
            expectTerms(...parsePhrase("24"))
          });

          it('in first index and having some elements, it should remove the fraction, but the terms inside of it should remain there', () => {
            pressKeys(...'21/2')
            expectTerms({type:'fraction',numeratorChildren: parsePhrase('21'),denominatorChildren:parsePhrase('2')})
            moveBackward(4)

            remove(1)

            expectCaretHorizontalPosition(0)
            expectTerms(...parsePhrase('212'))
          });
        });

        describe('Being inside the denominator: ', () => {

          it('in first index, it should remove the fraction', () => {
            pressKeys('/', 'ArrowRight')
            expectTerms({type:'fraction', denominatorChildren:[], numeratorChildren:[]})

            remove(1)

            expectCaretHorizontalPosition(0)
            expectTerms()
          });

          it('in first index and having elements only in the numerator, it should remove the fraction, but the terms inside of it should remain there', () => {
            pressKeys(...'24','/' )
            expectTerms({type:'fraction',numeratorChildren:parsePhrase('24'),denominatorChildren:[]})

            remove(1)

            expectCaretHorizontalPosition(getRightBorderPositionOfChar(1))
            expectTerms(...parsePhrase("24"))
          });


          it('in first index and having some elements, it should remove the fraction, but the terms inside of it should remain there', () => {
            pressKeys(...'21/2')
            expectTerms({type:'fraction',numeratorChildren: parsePhrase('21'),denominatorChildren:parsePhrase('2')})
            moveBackward(1)

            remove(1)

            expectCaretHorizontalPosition(getRightBorderPositionOfChar(1))
            expectTerms(...parsePhrase('212'))
          });

        });

      });

      describe('Exponent removal', () => {
        it('being outside, it should remove the complete exponent', () => {
          pressCtrlKeyAnd('e')
          pressKeys(...'1992')
          expectTerms({type:'exponent', exponentChildren:parsePhrase('1992')})

          moveForward(1)
          remove(1)

          expectTerms()
          expectCaretHorizontalPosition(0)
        });

        it('being inside with no term, should remove the exponent ', () => {
          pressCtrlKeyAnd('e')
          expectTerms({type:'exponent', exponentChildren:[]})

          remove(1)

          expectTerms()
          expectCaretHorizontalPosition(0)
        });

        it('being inside with some terms and in the first index, it should remove the exponent, but the elements should remain there', () => {
          pressCtrlKeyAnd('e')
          pressKeys(...'1992')
          moveBackward(4)

          remove(1)

          expectTerms(...parsePhrase('1992'))
          expectCaretHorizontalPosition(0)
        });
      });

      describe('Function removal', () => {
        const addFunction = (fn:string) => {
          pressKeys(...fn)
          expectTerms({type:'function', functionName:fn, functionChildren:[], argumentTerms:fn=='log' ? []:undefined})
        }

        it('being outside, should remove the whole function', () => {
          recognizableFunctions.forEach(fn=>{
            addFunction(fn)
            moveForward(1)

            remove(1)

            expectTerms()
            expectCaretHorizontalPosition(0)
          })
        });

        it('being inside, with no terms, should remove the whole function', () => {
          recognizableFunctions.forEach(fn=>{
            addFunction(fn)

            remove(1)

            expectTerms()
            expectCaretHorizontalPosition(0)
          })
        });

        it('being inside with some terms and the caret in the first index, it should remove the whole function, but the terms should remain there', () => {
          recognizableFunctions.forEach(fn=>{
            addFunction(fn)
            pressKeys(...'12345')
            moveBackward(5)

            remove(1)

            expectTerms(...parsePhrase('12345'))
            expectCaretHorizontalPosition(0)
            component.setTerms()
            fixture.detectChanges()
          })
        });
      });

      describe('Parenthesis removal', () => {
        beforeEach(()=>{
          component.setTerms()
          fixture.detectChanges()
        })

        it('being outside, it should remove only the last parenthesis character, and the other terms should remain', () => {
          pressKeys(...'(12345)')
          expectTerms({type:'parenthesis', parenthesisChildren:parsePhrase('12345')})

          remove(1)

          expectTerms(...parsePhrase('(12345'))
          expectCaretHorizontalPosition(getRightBorderPositionOfChar(5))
        });

        it('being inside, with no terms, should remove the whole parenthesis', () => {
          pressKeys(...'()')
          moveBackward(1)

          remove(1)

          expectTerms()
          expectCaretHorizontalPosition(0)
        });

        it('being inside, with some terms, and the caret in the first position, it should remove the parenthesis, but the inner terms should remain', () => {
          pressKeys(...'(12345)')
          expectTerms({type:'parenthesis', parenthesisChildren:parsePhrase('12345')})
          moveBackward(6)

          remove(1)

          expectTerms(...parsePhrase('12345'))
          expectCaretHorizontalPosition(0)
        });
      });

      describe('Root removal', () => {
        describe('in normal roots', () => {
          beforeEach(()=>{
            pressCtrlKeyAnd('r')
            expectTerms({type:'root', rootChildren:[]})
          })

          it('being outside, it should remove the whole root', () => {
            moveForward(1)

            remove(1)

            expectTerms()
            expectCaretHorizontalPosition(0)
          });

          it('being inside with no terms, it should remove the root', () => {
            remove(1)

            expectTerms()
            expectCaretHorizontalPosition(0)
          });

          it('being inside with some terms and wit the caret in the first position, it should remove the root, but the terms should remain there', () => {
            pressKeys(...'12345')
            expectTerms({type:'root', rootChildren:parsePhrase('12345')})
            moveBackward(5)

            remove(1)

            expectTerms(...parsePhrase('12345'))
          });
        });

        describe('in editable index roots', () => {
          beforeEach(()=>{
            dispatchEvents(new KeyboardEvent('keydown',{key:'r', altKey:true}))
            expectTerms({type:'root', rootChildren:[], radicalTerms:[]})
          })

          it('being outside, is should remove the whole root', () => {
            moveForward(2)

            remove(1)

            expectTerms()
            expectCaretHorizontalPosition(0)
          });

          it('being inside the index editor, it should remove the whole root', () => {
            remove(1)

            expectTerms()
            expectCaretHorizontalPosition(0)
          });

          it('being inside the index editor with some terms and the caret placed in the first positions, it should remove the root, but the index terms should remain there', () => {
            pressKeys(...'12345')
            moveBackward(5)

            remove(1)

            expectTerms(...parsePhrase('12345'))
            expectCaretHorizontalPosition(0)
          });
        });

      });
    });
  });



});
