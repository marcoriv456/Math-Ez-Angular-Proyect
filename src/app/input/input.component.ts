import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject, Input, OnInit, QueryList,
  Renderer2, ViewChild, ViewChildren,
} from '@angular/core';
import {FractionComponent} from "./components/fraction/fraction.component";
import {InputTermDirective} from "./directives/input-term.directive";
import {InputEditableElement} from "./classes/input-editable-element.class";
import {Term} from "./models/terms/term.model";
import {RootComponent} from "./components/root/root.component";
import {VariableProvider} from "./models/variable-provider.model";
import {WarningsService} from "./services/warnings/warnings.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {VariableProviderService} from "./services/variable-provider/variable-provider.service";
import {TermWarningMessageData} from "./models/char-validation/warning-message-data.model";
import {InputCharData} from "./models/input-char-data.model";
import {FunctionComponent} from "./components/function/function.component";
import {TermContainerComponent} from "./components/term-container/term-container.component";
import {WarningRenderData} from "./models/char-validation/warning-render-data.model";
import {EditableTermContainerComponent} from "./components/editable-term-container/editable-term-container.component";
import {InputUtilitiesService} from "./services/caret-positioning/input-utilities.service";
import {ParenthesisComponent} from "./components/parenthesis/parenthesis.component";
import {CaretContextManagerService} from "./services/caret-context-manager/caret-context-manager.service";
import {FractionAdder} from "./classes/adders/fraction-adder";
import {ParenthesisAdder} from "./classes/adders/parenthesis-adder.class";

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
    this.inputUtilitiesService.elementDeletedEmitter.subscribe(({elementIndex,residualData})=>this.deleteCurrentElement(elementIndex,residualData))
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
    this.detectChanges()
    this.moveCaretTo(this.nextCharData)
    this.searchFunctionWrittenReferences()
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
        this.moveCaretTo(this.noCharData)
        break;
      case 'End':
        this.moveCaretTo(this.lastCharData)
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


// ------------------STRUCTURING LOGIC------------------
//   ----FRACTIONS----
  private appendFraction(){
    this.moveCaretTo(new FractionAdder(this.currentElement,this.cdr).appendFraction())
  }
//   ----FRACTIONS----

//   ----PARENTHESIS----
  private appendParenthesis(parenthesis:string){
    const parenthesisAdder=new ParenthesisAdder(this.currentElement,this.cdr,parenthesis),
          isThereAMatchingParenthesis=parenthesisAdder.isThereAMatchingParenthesis()
    if(isThereAMatchingParenthesis)
      this.moveCaretTo(parenthesisAdder.appendParenthesis())
    else
      this.appendSingleChar(parenthesis)
  }

//   ----PARENTHESIS----

  //   ----ROOTS----
  private appendEditableRadicalRoot(){
    this.appendRoot({type:"root",rootChildren:[],radicalTerms:[]})
  }
  private appendSimpleRoot(){
    this.appendRoot({type:"root",rootChildren:[]})
  }

  private appendRoot(root:Term){
    this.appendTerm(root)
    let renderedRoot=(this.currentElement as RootComponent)
    this.setCurrentElement(renderedRoot.argumentComponent||renderedRoot.mainComponent)
    this.moveCaretTo(this.currentElement.noCharData)
  }
//   ----ROOTS----

//   ----EXPONENTS----
  private appendExponent(){
    this.appendTerm({type:'exponent',exponentChildren:[]})
  }
//   ----EXPONENTS----

//   ----CHARS----
  private appendSingleChar(char:string){
    this.appendTerm({char,type:'char'})
  }
//   ----CHARS----

  private appendTerm(term:Term,replaceFrom=this.nextIndex,deleteCount=0){
    this.currentElement.append(replaceFrom,deleteCount,term)
    this.detectChanges()
    let appendedTerm=this.nextRenderedElement?.asEditableElement
    if(appendedTerm)
      this.setCurrentElement(appendedTerm)
  }

  private deleteTerms(from=this.currentElement.caretIndex, deleteCount=1){
    if(this.currentElement.caretIndex==-1&&this.currentElement==this.termContainer)
      return
    if(this.getRenderedChar(from)?.asEditableElement instanceof ParenthesisComponent){
      this.deleteParenthesis(from)
      return;
    }
    let prevCharData=this.currentElement.remove(from,deleteCount)
    if(prevCharData)
      this.moveCaretTo(prevCharData)
    this.currentElement.updateValidation()
  }

  private deleteParenthesis(parenthesisIndex:number){
    let parenthesisTerms=this.getRenderedChar(parenthesisIndex)?.asEditableElement?.terms
    if(!parenthesisTerms)
      return;
    let terms:Term[]=[{type:'char',char:'('},...parenthesisTerms]
    this.currentElement.terms.splice(parenthesisIndex,1,...terms)
    this.detectChanges()
    this.moveCaretTo(this.getCharData(parenthesisIndex+terms.length-1) ||this.lastCharData)
  }

  private deleteCurrentElement(elementIndex:number,residualData:Term[]){
    let indexToMoveAt=elementIndex+residualData.length-1
    if(this.currentElement instanceof ParenthesisComponent)
      indexToMoveAt=elementIndex-1
    this.moveContextToActualParent();
    this.currentElement.append(elementIndex,1,...residualData)
    this.detectChanges()
    this.moveCaretTo(this.getCharData(indexToMoveAt) ||this.lastCharData)
  }


// ------------------STRUCTURING LOGIC------------------
// ------------------VALIDATION LOGIC------------------
  private showWarning({messages,position}:WarningRenderData){
    this.showingWarning=true
    this.detectChanges()
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
  private searchFunctionWrittenReferences(){
    let {indices,foundFunction}=this.evaluateRecognizableFunctions()
    if(!indices)
      return;
    let from=indices[0][0],
        to=indices[0][1]-1
    this.appendFunction(from,to,foundFunction)
  }

  private evaluateRecognizableFunctions(){
    let coincidence:RegExpExecArray|null=null,
        foundFunction='',
        currentElementValue=this.currentElement.toString
    for(let functionName of this.recognizableFunctions){
      let functionRegexp=new RegExp(functionName,'id')
      coincidence=functionRegexp.exec(currentElementValue)
      foundFunction=functionName
      if(coincidence)
        break;
    }
    return{indices:coincidence?.indices, foundFunction}
  }

  private appendFunction(from:number,to:number,functionName:string){
    let functionTerm:Term={
      type:'function',
      functionName,
      functionChildren:[],
      argumentTerms:functionName=='log'?[]:undefined
    }
    this.appendTerm(functionTerm,from,to-from+1)
    let renderedFunction=this.getRenderedChar(this.nextIndex-functionName.length)?.asEditableElement as FunctionComponent
    if(renderedFunction)
      this.setCurrentElement(renderedFunction.argumentComponent||renderedFunction.mainContainer)
    this.moveCaretTo(this.currentElement.noCharData)
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

  private getCharData(index:number){
    return this.currentElement.getCharData(index)
  }

  private get nextCharData(){
    return this.currentElement.nextCharData
  }

  private get noCharData(){
    return this.currentElement.noCharData
  }

  private get lastCharData(){
    return this.currentElement.lastCharData
  }

  private get nextIndex(){
    return this.currentElement.nextIndex
  }

  private get nextRenderedElement() {
    return this.getRenderedChar(this.currentElement.caretIndex + 1)
  }

  private getRenderedChar(index:number){
    return this.currentElement.getRenderedChar(index)
  }

  private detectChanges(){
    this.cdr.detectChanges()
  }
  // ----------LOWER LEVEL METHODS----------
}

