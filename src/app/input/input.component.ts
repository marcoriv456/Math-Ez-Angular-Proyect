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
import {InputEditableElement} from "./classes/input-editable-element.class";
import {Term} from "./models/terms/term.model";
import {VariableProvider} from "./models/variable-provider.model";
import {WarningsService} from "./services/warnings/warnings.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {VariableProviderService} from "./services/variable-provider/variable-provider.service";
import {TermWarningMessageData} from "./models/char-validation/warning-message-data.model";
import {InputCharData} from "./models/input-char-data.model";
import {WarningRenderData} from "./models/char-validation/warning-render-data.model";
import {EditableTermContainerComponent} from "./components/editable-term-container/editable-term-container.component";
import {InputUtilitiesService} from "./services/caret-positioning/input-utilities.service";
import {CaretContextManagerService} from "./services/caret-context-manager/caret-context-manager.service";
import {FractionAdder} from "./classes/adders/fraction-adder";
import {ParenthesisAdder} from "./classes/adders/parenthesis-adder.class";
import {FunctionAdder} from "./classes/adders/function-adder";
import {SimpleAdder} from "./classes/adders/simple-adder.class";
import {TermDeleter} from "./classes/term-deleter.class";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  animations:[
    trigger('warning-animations',[
      transition(':enter',[
        style({transform:'translateY(-100%)',opacity:0}),
        animate('500ms cubic-bezier(0,0,0,1)',style({transform:'translateY(0)',opacity:1}))
      ]),
      transition(':leave',[
        animate('500ms cubic-bezier(0,0,0,1)',style({transform:'translateY(-100%)',opacity:0}))
      ]),

    ]),
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
  protected showingWarning=false
  protected warningMessages:TermWarningMessageData[]=[]
  private recognizableFunctions=['sen','cos','tan','log','ln']

  readonly ref=inject(ElementRef).nativeElement as HTMLElement
  private cdr = inject(ChangeDetectorRef)
  private renderer = inject(Renderer2)
  private inputUtilitiesService=inject(InputUtilitiesService)
  private warningsService=inject(WarningsService)
  private variableProviderService=inject(VariableProviderService)
  private caretContextManagerService=inject(CaretContextManagerService)

  @ViewChild(EditableTermContainerComponent)
  private termContainer!: EditableTermContainerComponent;
  @ViewChild('caret')
  private caretRef!: ElementRef
  @ViewChild('overlay')
  private overlay!:ElementRef
  @ViewChild('warningContainer')
  private warningContainer!:ElementRef

  @HostBinding('tabindex')
  private tabIndex = 0

  @Input()
  variableProvider!:VariableProvider

  ngOnInit() {
    this.variableProviderService.setVariableProvider(this.variableProvider)
  }

  ngAfterViewInit() {
    this.currentElement=this.termContainer
    this.inputUtilitiesService.setInputRef(this)
    this.caretContextManagerService.setup(this.termContainer)
    this.subscribeToServices()
  }

  private subscribeToServices(){
    this.inputUtilitiesService.charClicked.subscribe(this.moveCaretTo.bind(this))
    // this.inputUtilitiesService.elementDeletedEmitter.subscribe(({elementIndex,residualData})=>this.deleteCurrentElement(elementIndex,residualData))
    this.warningsService.showWarning.subscribe(this.showWarning.bind(this))
    this.warningsService.hideWarning.subscribe(this.hideWarning.bind(this))
  }

  @HostListener('click')
  protected onClick() {
    this.setCurrentElement(this.termContainer)
    this.moveCaretTo(this.termContainer.lastCharData)
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
        this.deleteTerms(
          this.currentElement.getPrevSpecialCharFixedData().index+1,
          this.currentElement.caretIndex-this.currentElement.getPrevSpecialCharFixedData().index)
        break;
      case 'ArrowRight':
        this.moveCaretTo(this.currentElement.getNextSpecialCharFixedData())
        break;
      case 'ArrowLeft':
        this.moveCaretTo(this.currentElement.getPrevSpecialCharFixedData())
        break;
    }
  }
  // ------------INPUT MAPPING-------------
  // -----------CARET CONTEXT LOGIC------------
  private moveToNextElement(){
    let nextElementData=this.caretContextManagerService.getNextElementData(this.currentElement)
    this.moveCaretTo(nextElementData)
  }

  private moveToPreviousElement(){
    let prevElementData=this.caretContextManagerService.getPrevElementData(this.currentElement)
    this.moveCaretTo(prevElementData)
  }

  private moveContextToActualParent(){
    let actualParentContextData=this.caretContextManagerService.getActualParentContextData(this.currentElement)
    this.moveCaretTo(actualParentContextData)
  }

  private setCurrentElement(element:InputEditableElement){
    this.renderer.removeClass(this.currentElement.ref,'selected')
    this.currentElement=element
    this.renderer.addClass(this.currentElement.ref,'selected')
    this.renderer.setStyle(this.caretRef.nativeElement,'--height',element.size+'px',2)
    this.renderer.setStyle(this.caretRef.nativeElement,'top',element.positionY+'px')
  }
  // -----------CARET CONTEXT LOGIC------------

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
    this.appendTerm({type:"root",rootChildren:[],radicalTerms:[]})
  }

  private appendSimpleRoot(){
    this.appendTerm({type:"root",rootChildren:[]})
  }

  private appendExponent(){
    this.appendTerm({type:'exponent',exponentChildren:[]})
  }

  private appendSingleChar(char:string){
    this.appendTerm({type:'char',char})
  }

  private appendTerm(term:Term,replaceFrom?:number,deleteCount?:number){
    let adder=new SimpleAdder(this.currentElement,this.cdr,term)
    this.moveCaretTo(adder.appendTerm(replaceFrom,deleteCount))
  }

  private deleteTerms(startIndex:number=this.currentElement.caretIndex,deleteCount=1){
    let termDeleter=new TermDeleter(this.currentElement,this.termContainer,this.cdr)
    this.moveCaretTo(termDeleter.deleteTerms(startIndex,deleteCount)||this.currentElement.noCharData)
  }

// ------------------STRUCTURING LOGIC------------------
// ------------------VALIDATION LOGIC------------------
  private showWarning({messages,position}:WarningRenderData){
    this.showingWarning=true
    this.cdr.detectChanges()
    let warningContainer=this.warningContainer.nativeElement as HTMLElement
    this.renderer.setStyle(warningContainer,'left',position.x+'px')
    this.renderer.setStyle(warningContainer,'top',position.y+'px')
    this.warningMessages=messages
  }
  private hideWarning(){
    this.showingWarning=false
  }

  // ------------------VALIDATION LOGIC------------------
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
        overlayViewWidth=overlay.clientWidth,
        scrollBarFrom=overlay.scrollLeft,
        scrollBarTo=scrollBarFrom+overlayViewWidth,
        isCharVisible=positionX > scrollBarFrom && positionX < scrollBarTo
    if(!isCharVisible){
      let isCaretOnRightSide=positionX > scrollBarFrom
      overlay.scrollTo({left : isCaretOnRightSide ? positionX-overlayViewWidth+2 : positionX})
    }
  }
  // ----------AUTO-SCROLL LOGIC-----------

  // ----------LOWER LEVEL METHODS----------
  private moveCaretTo({positionX,index,parent}:InputCharData){
    this.renderer.setStyle(this.caretRef.nativeElement,'left',positionX+'px')
    if(parent)
      this.setCurrentElement(parent)
    this.currentElement.caretIndex=index
    this.makeCharVisible(positionX)
  }

  // ----------LOWER LEVEL METHODS----------
}

