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

describe('InputComponent - Caret positioning:', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let caretElement:HTMLElement

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

  const getLeftBorderPositionOfChar = (index:number) => {
    return getRenderedCharacters().item(index).getBoundingClientRect().left
  }


  const expectTerms = (...expectedTerms: Term[]) => {
    expect(component.getTerms()).toEqual(expectedTerms)
  }

  const expectCaretHorizontalPosition = (expectedPositionX:number) => {
    fixture.detectChanges()
    expect(getCaretPositionX()).toBeCloseTo(expectedPositionX,0)
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

    fixture.detectChanges();
    caretElement=document.querySelector('#caret-container') as HTMLElement
  });

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
