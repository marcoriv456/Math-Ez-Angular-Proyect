import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Term} from "./models/terms/term.model";
import {VariableProvider} from "./models/variable-provider.model";
import {WarningsService} from "./services/warnings/warnings.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {VariableProviderService} from "./services/variable-provider/variable-provider.service";
import {InputCharData} from "./models/input-char-data.model";
import {TermValidationWarningRenderData} from "./validation/models/term-validation-warning-render-data.model";
import {EditableTermContainerComponent} from "./components/editable-term-container/editable-term-container.component";
import {CharClickedNotifierService} from "./services/char-clicked-notifier/char-clicked-notifier.service";
import {FractionAdder} from "./classes/adders/fraction-adder";
import {ParenthesisAdder} from "./classes/adders/parenthesis-adder.class";
import {FunctionAdder} from "./classes/adders/function-adder";
import {SimpleAdder} from "./classes/adders/simple-adder.class";
import {TermDeleter} from "./classes/term-deleter/term-deleter.class";
import {CharVisibilityManager} from "./classes/char-visibility-manager/char-visibility-manager.class";
import {RootAdder} from "./classes/adders/root-adder.class";
import {InputContextManager} from "./classes/input-context-manager/input-context-manager.class";
import {InputEditableElement} from "./directives/input-editable-element/input-editable-element.directive";
import {SpecialCharFinder} from "./classes/special-char-finder/special-char-finder.class";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  animations:[
    trigger('advice-fading',[
      transition(':enter',[
        style({transform:'translateY(-10%)',opacity:0}),
        animate('500ms cubic-bezier(0,0,0,1)',style({transform:'translateY(0)',opacity:1}))
      ]),
      transition(':leave',[
        animate('500ms cubic-bezier(0,0,0,1)',style({transform:'translateY(-10%)',opacity:0}))
      ]),
    ])
  ]
})
export class InputComponent implements AfterViewInit,OnInit {
  protected terms: Term[] = [];
  private currentElement!: InputEditableElement;
  public readonly recognizableFunctions=['sen','cos','tan','log','ln']
  protected caretStyleData={ height:'0px', left:'0px', top:'0px' }

  readonly ref=inject(ElementRef).nativeElement as HTMLElement
  private cdr = inject(ChangeDetectorRef)
  private inputUtilitiesService=inject(CharClickedNotifierService)
  private variableProviderService=inject(VariableProviderService)

  @ViewChild(EditableTermContainerComponent)
  private termContainer!: EditableTermContainerComponent;
  @ViewChild('overlay')
  private overlay!:ElementRef
  @HostBinding('tabindex')
  private tabIndex = 0

  @Input()
  variableProvider!:VariableProvider

  ngOnInit() {
    this.variableProviderService.setVariableProvider(this.variableProvider)
  }

  ngAfterViewInit() {
    this.currentElement=this.termContainer
    this.inputUtilitiesService.charClicked.subscribe(this.moveCaretTo.bind(this))
  }

  // ------------PUBLIC METHODS-------------
  public append(...terms:Term[]){
    terms.forEach(term=>this.appendTerm(term))
  }

  public getTerms(){
    return [...this.terms]
  }

  public setTerms(...terms:Term[]){
    this.terms=terms
  }
  // ------------PUBLIC METHODS-------------
  // ------------INPUT MAPPING-------------
  @HostListener('keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent) {
    let {key, ctrlKey, altKey} = event
    if (key !== 'Tab')
      event.preventDefault()
    if (key.length == 1)
      this.appendOnEntry(key,ctrlKey,altKey)
    else if (ctrlKey)
      this.onSpecialCtrlKeyDown(key)
    else
      this.onSpecialKeyDown(key)
  }

  private appendOnEntry(char:string,ctrlKey?:boolean,altKey?:boolean) {
    if(char=='/')
      this.appendFraction()
    else if(char=='e' && ctrlKey)
      this.appendExponent()
    else if(char=='r' && ctrlKey)
      this.appendSimpleRoot()
    else if(char=='r' && altKey)
      this.appendEditableRadicalRoot()
    else if(char=='p' && ctrlKey)
      this.appendSingleChar('π')
    else if(char=='(' || char==')')
      this.appendParenthesis(char)
    else
      this.appendSingleChar(char)
    this.lookForMathFunctionReferences()
  }

  private onSpecialKeyDown(key: string) {
    switch (key) {
      case 'Backspace':
        this.deleteTerms()
        break;
      case 'ArrowRight':
        this.moveToNextElement()
        break;
      case 'ArrowLeft':
        this.moveToPreviousElement()
        break;
      case 'Home':
        this.moveCaretTo(this.currentElement.noCharData)
        break;
      case 'End':
        this.moveCaretTo(this.currentElement.lastCharData)
        break;
    }
  }

  private onSpecialCtrlKeyDown(key:string){
    switch (key){
      case 'Backspace':
        this.deleteTermsUntilPrevSpecialChar()
        break;
      case 'ArrowRight':
        this.moveToNextSpecialChar()
        break;
      case 'ArrowLeft':
        this.moveToPrevSpecialChar()
        break;
      case 'Home':
        this.moveCaretTo(this.termContainer.noCharData)
        break;
      case 'End':
        this.moveCaretTo(this.termContainer.lastCharData)
        break;
    }
  }

  @HostListener('click')
  private onClick(){
    this.moveCaretTo(this.termContainer.lastCharData)
  }
  // ------------INPUT MAPPING-------------
  // -----------CARET CONTEXT LOGIC------------
  private moveToNextElement(){
    let nextElementData=this.getContextManager().getNextElementData()
    this.moveCaretTo(nextElementData)
  }

  private moveToPreviousElement(){
    let prevElementData=this.getContextManager().getPrevElementData()
    this.moveCaretTo(prevElementData)
  }

  private getContextManager(){
    return new InputContextManager(this.currentElement,this.termContainer)
  }

  private moveToNextSpecialChar(){
    this.moveCaretTo(this.getCharFinder().getNextSpecialCharFixedData())
  }

  private moveToPrevSpecialChar(){
    this.moveCaretTo(this.getCharFinder().getPrevSpecialCharFixedData())
  }

  private deleteTermsUntilPrevSpecialChar(){
    const charFinder=this.getCharFinder()

    const startIndex=charFinder.getPrevSpecialCharFixedData().index+1,
          deleteCount= this.currentElement.caretIndex-charFinder.getPrevSpecialCharFixedData().index

    this.deleteTerms(startIndex,deleteCount)
  }

  private getCharFinder(){
    return new SpecialCharFinder(this.currentElement)
  }

  // -----------CARET CONTEXT LOGIC------------
// ------------------STRUCTURING LOGIC------------------
  private appendFraction(){
    this.moveCaretTo(new FractionAdder(this.currentElement,this.cdr).appendFraction())
  }

  private appendParenthesis(parenthesis:string){
    const parenthesisAdder=new ParenthesisAdder(this.currentElement,this.cdr,parenthesis),
          isThereAMatchingParenthesis=parenthesisAdder.isThereAMatchingParenthesis()
    if(isThereAMatchingParenthesis)
      this.moveCaretTo(parenthesisAdder.appendParenthesis())
    else
      this.appendSingleChar(parenthesis)
  }

  private appendEditableRadicalRoot(){
    this.moveCaretTo(this.getRoodAdder().appendEditableRadicalRoot())
  }

  private appendSimpleRoot(){
    this.moveCaretTo(this.getRoodAdder().appendSimpleRoot())
  }

  private getRoodAdder(){
    return new RootAdder(this.currentElement,this.cdr)
  }

  private appendExponent(){
    this.appendTerm({type:'exponent',exponentChildren:[]})
  }

  private appendSingleChar(char:string){
    this.appendTerm({type:'char',char})
  }

  private appendTerm(term:Term){
    let adder=new SimpleAdder(this.currentElement,this.cdr,term)
    this.moveCaretTo(adder.appendTerm())
  }

  private deleteTerms(startIndex:number=this.currentElement.caretIndex,deleteCount=1){
    let termDeleter=new TermDeleter(this.currentElement,this.termContainer,this.cdr)
    this.moveCaretTo(termDeleter.deleteTerms(startIndex,deleteCount)||this.currentElement.noCharData)
  }
// ------------------STRUCTURING LOGIC------------------
  // ------------------FUNCTION CHECKING LOGIC------------------
  private lookForMathFunctionReferences(){
    const functionAdder=new FunctionAdder(this.recognizableFunctions,this.currentElement,this.cdr),
          functionReferenceWasFound=functionAdder.searchFunctionWrittenReferences()
    if(functionReferenceWasFound)
      this.moveCaretTo(functionAdder.appendFunction())
  }
  // ------------------FUNCTION CHECKING LOGIC------------------

  // ----------AUTO-SCROLL LOGIC-----------
  private makeCharVisible(positionX:number){
    let overlay=this.overlay.nativeElement as HTMLElement,
        charVisibilityManager=new CharVisibilityManager(overlay)

    charVisibilityManager.makeCharVisible(positionX)
  }
  // ----------AUTO-SCROLL LOGIC-----------

  // ----------LOWER LEVEL METHODS----------
  private moveCaretTo({positionX,index,parent}:InputCharData){
    this.caretStyleData.left=positionX+'px'
    if(parent)
      this.setCurrentElement(parent)
    this.currentElement.caretIndex=index
    this.makeCharVisible(positionX)
  }

  private setCurrentElement(element:InputEditableElement){
    this.currentElement.selected=false
    this.currentElement=element
    this.currentElement.selected=true

    this.caretStyleData.height=element.size+'px'
    this.caretStyleData.top=element.positionY-this.ref.getBoundingClientRect().top+'px'
  }
  // ----------LOWER LEVEL METHODS----------
}

