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
import {InputUtilitiesService} from "./services/caret-positioning/input-utilities.service";
import {FractionComponent} from "./components/fraction/fraction.component";
import {InputTermDirective} from "./directives/input-term.directive";
import {InputEditableElement} from "./models/input-editable-element.class";
import {CharTerm} from "./models/terms/char-term.model";
import {FractionTerm} from "./models/terms/fraction-term.model";
import {RootTerm} from "./models/terms/root-term.model";
import {Term} from "./models/terms/term.model";
import {FractionChildComponent} from "./components/fraction/fraction-child/fraction-child.component";
import {RootComponent} from "./components/root/root.component";
import {VariableProvider} from "./models/variable-provider.model";
import {WarningsService} from "./services/warnings/warnings.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {VariableProviderService} from "./services/variable-provider/variable-provider.service";
import {WarningMessageData} from "./models/char-validation/warning-message-data.model";
import {InputCharData} from "./models/input-char-data.model";
import {TermContainerComponent} from "./components/term-container/term-container.component";
import {TermArgumentComponent} from "./components/term-argument/term-argument.component";
import {FunctionComponent} from "./components/function/function.component";

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
export class InputComponent extends InputEditableElement implements AfterViewInit,OnInit {
  @HostBinding('tabindex')
  protected tabIndex = 0
  @ViewChild('caret')
  private caretRef!: ElementRef
  @ViewChild('overlay')
  private overlay!:ElementRef
  @ViewChild(TermContainerComponent)
  readonly termContainer!:TermContainerComponent;
  readonly parent = undefined

  @HostListener('click')
  protected onClick() {
    this.setCurrentElement(this)
    this.moveCaretTo(this.lastCharData)
  }

  private cdr = inject(ChangeDetectorRef)
  private renderer = inject(Renderer2)
  readonly inputUtilitiesService = inject(InputUtilitiesService)
  private warningsService=inject(WarningsService)
  readonly terms: Term[] = [
    {char: '1', type: 'char'},
    {char: '2', type: 'char'},
    {char: '3', type: 'char'},
    {char: '4', type: 'char'},
    {char: '5', type: 'char'},
    {char: '6', type: 'char'},
    {char: '7', type: 'char'},
    {char: '8', type: 'char'},
    {char: '9', type: 'char'},
    {char: ' ', type: 'char'},
    {
      numeratorChildren: [{char: '1', type: 'char'}, {char: '0', type: 'char'}],
      denominatorChildren: [{char: '4', type: 'char'}],
      type: 'fraction'
    },
    {char: ' ', type: 'char'},
    {
      functionName:'log',
      functionChildren:[
        {char: '8', type: 'char'},
        {char: '1', type: 'char'},
      ],
      argumentTerms:[{char: '9', type: 'char'}],
      type:'function'
    },
    {char: ' ', type: 'char'},
    {
      rootChildren:[
        {char: '8', type: 'char'},
        {char: '1', type: 'char'},
      ],
      radicalTerms:[{char:'9',type:'char'}],
      type:'root'
    },
    {char: ' ', type: 'char'},
    {
      type:'fraction',
      numeratorChildren:[
        {char: '1', type: 'char'}
      ],
      denominatorChildren:[
        {char: '8', type: 'char'},
      ]
    },
    {char: ' ', type: 'char'},
    {char: '8', type: 'char'},
    {
      exponentChildren:[
        {char: '2', type: 'char'},
      ],
      type:'exponent'
    }
  ];

  private currentElement: InputEditableElement = this
  private caretIndex = 0
  readonly ref = inject(ElementRef).nativeElement as HTMLElement

  readonly index = 0

  ngAfterViewInit() {
    this.inputUtilitiesService.charClicked.subscribe((charData) => this.moveCaretTo(charData))
    this.inputUtilitiesService.elementDeletedEmitter.subscribe(({elementIndex,residualData})=>this.deleteElement(elementIndex,residualData))
    this.warningsService.showWarning.subscribe((data)=>this.showWarning(data))
    this.warningsService.hideWarning.subscribe(()=>this.hideWarning())
    this.inputUtilitiesService.setInputRef(this)
  }
  ngOnInit() {
    this.variableProviderService.setVariableProvider(this.variableProvider)
  }

  override get positionX(): number {
    return this.ref.getBoundingClientRect().left
  }

  override get positionY(): number {
    return 0
  }

  @HostListener('keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent) {
    let {key, ctrlKey, altKey} = event

    if (key !== 'Tab')
      event.preventDefault()
    if (key.length == 1)
      this.appendChar(key,ctrlKey,altKey)
    else if (ctrlKey)
      this.onSpecialCtrlKeyDown(key)
    else
      this.onSpecialKeyDown(key)
  }

  private onSpecialKeyDown(key: string) {
    switch (key) {
      case 'Backspace':
        this.deleteChar()
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

  private moveToNextElement() {
    let nextElement = this.currentElement.terms[this.caretIndex + 1]
    let isNextElementChar = nextElement && nextElement.type == 'char'
    let isCaretInTheLastPosition = !nextElement && this.currentElement == this

    if (isNextElementChar || isCaretInTheLastPosition)
      this.moveCaretTo(this.nextCharData)
    else
      this.moveCaretContextForward()
  }

  private moveCaretContextForward() {
    let nextRenderedElement = this.nextRenderedElement
    let parent=this.currentElement.parent
    let isCaretInTheLastPosition=this.caretIndex==this.currentElement.lastCharData.index
    if(parent && !parent.editable  && isCaretInTheLastPosition)
      nextRenderedElement=this.nextRenderedElementInParent
    let nextRenderedElementClassRef = nextRenderedElement?.asEditableElement
    if (!nextRenderedElement || !nextRenderedElementClassRef){
      let prevContextIndex=this.moveContextToActualParent()
      this.moveCaretTo(this.currentElement.getCharData(prevContextIndex)||this.currentElement.lastCharData)
    }
    else
      this.moveContextToNextRenderedElement(nextRenderedElement)
  }

  private get nextRenderedElement() {
    return this.getRenderedElementAt(this.caretIndex + 1)
  }

  private get nextRenderedElementInParent() {
    return this.getRenderedElementInParentAt(this.currentElement.index + 1)
  }

  private moveContextToNextRenderedElement(nextRenderedElement: InputTermDirective) {
    let nextEditableEl=nextRenderedElement.asEditableElement
    if(nextEditableEl && !nextEditableEl.editable)
      nextEditableEl=nextEditableEl.renderedChars.get(0)?.asEditableElement
    this.setCurrentElement(nextEditableEl || this)
    this.moveCaretTo(this.currentElement.noCharData)
  }

  private moveToPreviousElement() {
    let prevElement = this.currentElement.terms[this.caretIndex]
    let isPrevElementChar = prevElement && prevElement.type == 'char'
    let isCaretInFirstChar = !prevElement && this.caretIndex == 0
    let isCaretInTheFirstPosition = !prevElement && this.currentElement == this

    if (isPrevElementChar || isCaretInTheFirstPosition || isCaretInFirstChar)
      this.moveCaretTo(this.prevCharData)
    else
      this.moveCaretContextBackwards()
  }

  private moveCaretContextBackwards() {
    let prevRenderedElement = this.prevRenderedElement
    let parent=this.currentElement.parent
    let isCaretInTheFirstPosition=this.caretIndex==-1
    let parentHasMoreThanOneChild=parent && parent.renderedChars.length > 1
    if(parent && !parent.editable && isCaretInTheFirstPosition && parentHasMoreThanOneChild)
      prevRenderedElement=this.prevRenderedElementInParent
    if (!prevRenderedElement || !prevRenderedElement.asEditableElement){
      let prevContextIndex=this.moveContextToActualParent()
      this.moveCaretTo(this.currentElement.getCharData(prevContextIndex-1) || this.currentElement.noCharData)
    }
    else
      this.moveContextToPrevRenderedElement(prevRenderedElement)
  }

  private moveContextToPrevRenderedElement(prevRenderedElement:InputTermDirective){
    let prevEditableEl=prevRenderedElement.asEditableElement
    if(prevEditableEl&&!prevEditableEl.editable)
      prevEditableEl=prevEditableEl.renderedChars.get(prevEditableEl.lastCharData.index)?.asEditableElement
    this.setCurrentElement(prevEditableEl || this)
    this.moveCaretTo(this.currentElement.lastCharData)
  }

  private get prevRenderedElement(){
    return this.getRenderedElementAt(this.caretIndex)
  }

  private get prevRenderedElementInParent(){
    return this.getRenderedElementInParentAt(this.currentElement.index-1)
  }

  private moveContextToActualParent(){
    let prevCurrentElementIndex=this.currentElement.index
    let actualParent=this.currentElement.parent
    if(actualParent && !actualParent.editable){
      prevCurrentElementIndex=actualParent.index
      actualParent=actualParent.parent
    }
    this.setCurrentElement(actualParent||this)
    return prevCurrentElementIndex
  }




  private getRenderedElementAt(index:number){
    return this.currentElement.renderedChars.get(index)
  }
  private getRenderedElementInParentAt(index:number){
    return this.currentElement.parent?.renderedChars.get(index)
  }


  private setCurrentElement(element:InputEditableElement){
    this.renderer.removeClass(this.currentElement.ref,'selected')
    this.currentElement=element
    this.renderer.addClass(this.currentElement.ref,'selected')
    this.renderer.setStyle(this.caretRef.nativeElement,'--height',element.size+'px',2)
    this.renderer.setStyle(this.caretRef.nativeElement,'top',element.positionY+'px')
  }

  private get nextCharData(){
    return this.currentElement.getCharData(this.caretIndex+1)||this.currentElement.lastCharData
  }
  private get prevCharData(){
    return this.currentElement.getCharData(this.caretIndex-1)||this.currentElement.noCharData
  }


  private onSpecialCtrlKeyDown(key:string){
    switch (key){
      case 'Backspace':
        this.deleteChar(this.currentElement.getPrevSpecialCharFixedData(this.caretIndex).index+1,this.caretIndex-this.currentElement.getPrevSpecialCharFixedData(this.caretIndex).index)
        break;
      case 'ArrowRight':
        this.moveCaretTo(this.currentElement.getNextSpecialCharFixedData(this.caretIndex))
        break;
      case 'ArrowLeft':
        this.moveCaretTo(this.currentElement.getPrevSpecialCharFixedData(this.caretIndex))
        break;
    }
  }

  override get noCharData(): InputCharData {
    let charData=super.noCharData
    charData.positionX=0
    charData.positionY=0
    return charData;
  }

  private appendChar(char:string,ctrlKey?:boolean,altKey?:boolean) {
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
    else if(char=='(')
      this.appendParenthesis()
    else
      this.appendSingleChar(char)
    this.cdr.detectChanges()
    this.moveCaretTo(this.nextCharData)
    this.searchFunctionWrittenReferences()
    this.currentElement.updateTermsValidation()
  }

  private moveCaretTo({positionX,positionY,index,size,parent}:InputCharData){
    this.renderer.setStyle(this.caretRef.nativeElement,'left',positionX+'px')
    if(parent)
      this.setCurrentElement(parent)
    this.caretIndex=index
    this.makeCharVisible(positionX)
  }
  private deleteChar(from=this.caretIndex, deleteCount=1){
    if(this.caretIndex==-1&&this.currentElement==this)
      return
    let prevCharData=this.currentElement.removeChars(from,deleteCount)
    if(prevCharData)
      this.moveCaretTo(prevCharData)
    this.currentElement.updateTermsValidation()
  }

  override removeChars(from: number, deleteCount: number = 1): InputCharData | undefined {
    return this.removeSimpleChar(from,deleteCount)
  }

// ------------------STRUCTURING LOGIC------------------
  private appendFraction(){
    let {from,to,prevChars,nextChars}=this.getFractionCharsData()
    this.currentElement.terms.splice(from, to-from, {
      numeratorChildren:prevChars,
      denominatorChildren:nextChars,
      type:'fraction'
    })
    this.moveCaretTo(this.currentElement.getCharData(from-1)||this.currentElement.lastCharData)
    let isFractionFilled=prevChars.length && nextChars.length
    if(!isFractionFilled)
      this.moveCaretToEmptyFractionChild(from,nextChars,prevChars)
  }

  private getFractionCharsData(){
    let prevCharsFrom=(this.currentElement.getPrevSpecialCharData(this.caretIndex)?.index||-1)+1
    let prevCharsTo=this.caretIndex+1
    let prevChars=this.currentElement.terms.slice(prevCharsFrom,prevCharsTo)
    let nextCharsTo=(this.currentElement.getNextSpecialCharData(this.caretIndex)?.index||this.currentElement.lastCharData.index+1)
    let nextCharsFrom=this.caretIndex+1
    let nextChars=this.currentElement.terms.slice(nextCharsFrom,nextCharsTo)
    return{from:prevCharsFrom,to:nextCharsTo,prevChars,nextChars}
  }

  private moveCaretToEmptyFractionChild(from:number,nextChars:Term[],prevChars:Term[]){
    this.cdr.detectChanges()
    let appendedFrac=this.currentElement.renderedChars.get(from)?.asEditableElement as FractionComponent
    if(!nextChars.length)
      this.setCurrentElement(appendedFrac.denominatorComponent?.asEditableElement||this)
    if(!prevChars.length)
      this.setCurrentElement(appendedFrac.numeratorComponent?.asEditableElement||this)
    this.moveCaretTo(this.currentElement.noCharData)
  }

  private deleteElement(elementIndex:number,residualData:Term[]){
    this.moveContextToActualParent();
    this.currentElement.terms.splice(elementIndex,1,...residualData)
    this.cdr.detectChanges()
    this.moveCaretTo(this.currentElement.getCharData(elementIndex+residualData.length-1) ||this.currentElement.lastCharData)
  }

  private appendExponent(){
    this.appendTerm({type:'exponent',exponentChildren:[]})
  }

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

  private appendParenthesis(){
    let {from,to,terms}=this.getTermsFromCurrentIndexToNextIrregularChar()
    this.appendTerm({type:'parenthesis',parenthesisChildren:terms},from,to-from)
  }

  private getTermsFromCurrentIndexToNextIrregularChar(){
    let from=this.caretIndex+1
    let to=(this.currentElement.getNextSpecialCharData(this.caretIndex)?.index||this.currentElement.lastCharData.index+1)
    return {from,to,terms:this.currentElement.terms.slice(from, to)}
  }
  private appendSingleChar(char:string){
    this.appendTerm({char,type:'char'})
  }

  private appendTerm(term:Term,replaceFrom=this.caretIndex+1,deleteCount=0){
    this.currentElement.terms.splice(replaceFrom,deleteCount,term)
    this.cdr.detectChanges()
    let appendedTerm=this.currentElement.renderedChars.get(this.caretIndex+1)?.asEditableElement
    if(appendedTerm)
      this.setCurrentElement(appendedTerm)
  }

// ------------------STRUCTURING LOGIC------------------
// ------------------SIZING LOGIC------------------

// ------------------SIZING LOGIC------------------
// ------------------VARIABLE CHECKING LOGIC------------------
  @Input()
  variableProvider!:VariableProvider
  private variableProviderService=inject(VariableProviderService)

  @ViewChild('warningContainer')
  private warningContainer!:ElementRef

  protected showingWarning=false
  protected warningMessages:WarningMessageData[]=[]

  private showWarning({messages,position}:{messages:WarningMessageData[],position:InputCharData}){
    this.showingWarning=true
    this.cdr.detectChanges()
    let warningContainer=this.warningContainer.nativeElement as HTMLElement
    this.renderer.setStyle(warningContainer,'left',position.positionX+'px')
    this.renderer.setStyle(warningContainer,'top',position.positionY+'px')
    this.warningMessages=messages
  }
  private hideWarning(){
    this.showingWarning=false
  }

// ------------------VARIABLE CHECKING LOGIC------------------
  // ------------------FUNCTION CHECKING LOGIC------------------
  private recognizableFunctions=['sen','cos','tan','log','ln']
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
    let renderedFunction=this.currentElement.renderedChars.get(this.caretIndex+1-functionName.length)?.asEditableElement as FunctionComponent
    if(renderedFunction)
      this.setCurrentElement(renderedFunction.argumentComponent||renderedFunction.mainContainer)
    this.moveCaretTo(this.currentElement.noCharData)
  }


  // ------------------FUNCTION CHECKING LOGIC------------------

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
}

