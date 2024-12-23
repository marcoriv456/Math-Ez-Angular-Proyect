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
import {InputEditableElement} from "./models/input-editable-element.class";
import {Term} from "./models/terms/term.model";
import {RootComponent} from "./components/root/root.component";
import {VariableProvider} from "./models/variable-provider.model";
import {WarningsService} from "./services/warnings/warnings.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {VariableProviderService} from "./services/variable-provider/variable-provider.service";
import {WarningMessageData} from "./models/char-validation/warning-message-data.model";
import {InputCharData} from "./models/input-char-data.model";
import {FunctionComponent} from "./components/function/function.component";
import {TermContainerComponent} from "./components/term-container/term-container.component";
import {WarningRenderData} from "./models/char-validation/warning-render-data.model";
import {EditableTermContainerComponent} from "./components/editable-term-container/editable-term-container.component";
import {InputUtilitiesService} from "./services/caret-positioning/input-utilities.service";

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
  @ViewChild(EditableTermContainerComponent)
  private termContainer!: EditableTermContainerComponent;
  @HostBinding('tabindex')
  private tabIndex = 0
  @ViewChild('caret')
  private caretRef!: ElementRef
  @ViewChild('overlay')
  private overlay!:ElementRef
  readonly ref=inject(ElementRef).nativeElement as HTMLElement

  @HostListener('click')
  protected onClick() {
    this.setCurrentElement(this.termContainer)
    this.moveCaretTo(this.termContainer.lastCharData)
  }

  private cdr = inject(ChangeDetectorRef)
  private renderer = inject(Renderer2)
  terms: Term[] = [
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

  private currentElement!: InputEditableElement;
  private inputUtilitiesService=inject(InputUtilitiesService)
  private warningsService=inject(WarningsService)

  ngAfterViewInit() {
    this.currentElement=this.termContainer
    this.inputUtilitiesService.charClicked.subscribe((charData) => this.moveCaretTo(charData))
    this.inputUtilitiesService.elementDeletedEmitter.subscribe(({elementIndex,residualData})=>{
      console.log('on element deleted callback')

      this.deleteElement(elementIndex,residualData)
    })
    this.warningsService.showWarning.subscribe((data)=>this.showWarning(data))
    this.warningsService.hideWarning.subscribe(()=>this.hideWarning())
    this.inputUtilitiesService.setInputRef(this)
  }
  ngOnInit() {
    this.variableProviderService.setVariableProvider(this.variableProvider)
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
    let nextElement = this.currentElement.terms[this.currentElement.caretIndex + 1]
    let isNextElementChar = nextElement && nextElement.type == 'char'
    let isCaretInTheLastPosition = !nextElement && this.currentElement == this.termContainer

    if (isNextElementChar || isCaretInTheLastPosition)
      this.moveCaretTo(this.nextCharData)
    else
      this.moveCaretContextForward()
  }

  private moveCaretContextForward() {
    let nextRenderedElement = this.nextRenderedElement
    let parent=this.currentElement.parent
    let isCaretInTheLastPosition=this.currentElement.caretIndex==this.currentElement.lastCharData.index
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
    return this.getRenderedElementAt(this.currentElement.caretIndex + 1)
  }

  private get nextRenderedElementInParent() {
    return this.getRenderedElementInParentAt(this.currentElement.index + 1)
  }

  private moveContextToNextRenderedElement(nextRenderedElement: InputTermDirective) {
    let nextEditableEl=nextRenderedElement.asEditableElement
    if(nextEditableEl && !nextEditableEl.editable)
      nextEditableEl=nextEditableEl.renderedChars.get(0)?.asEditableElement
    this.setCurrentElement(nextEditableEl || this.termContainer)
    this.moveCaretTo(this.currentElement.noCharData)
  }

  private moveToPreviousElement() {
    let prevElement = this.currentElement.terms[this.currentElement.caretIndex]
    let isPrevElementChar = prevElement && prevElement.type == 'char'
    let isCaretInFirstChar = !prevElement && this.currentElement.caretIndex == 0
    let isCaretInTheFirstPosition = !prevElement && this.currentElement == this.termContainer

    if (isPrevElementChar || isCaretInTheFirstPosition || isCaretInFirstChar)
      this.moveCaretTo(this.prevCharData)
    else
      this.moveCaretContextBackwards()
  }

  private moveCaretContextBackwards() {
    let prevRenderedElement = this.prevRenderedElement
    let parent=this.currentElement.parent
    let isCaretInTheFirstPosition=this.currentElement.caretIndex==-1
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
    this.setCurrentElement(prevEditableEl || this.termContainer)
    this.moveCaretTo(this.currentElement.lastCharData)
  }

  private get prevRenderedElement(){
    return this.getRenderedElementAt(this.currentElement.caretIndex)
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
    this.setCurrentElement(actualParent||this.termContainer)
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
    return this.currentElement.getCharData(this.currentElement.caretIndex+1)||this.currentElement.lastCharData
  }
  private get prevCharData(){
    return this.currentElement.getCharData(this.currentElement.caretIndex-1)||this.currentElement.noCharData
  }


  private onSpecialCtrlKeyDown(key:string){
    switch (key){
      case 'Backspace':
        this.deleteChar(
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
    else if(char=='(' || char==')')
      this.appendParenthesis(char)
    else
      this.appendSingleChar(char)
    this.cdr.detectChanges()
    this.moveCaretTo(this.nextCharData)
    this.searchFunctionWrittenReferences()
  }

  private moveCaretTo({positionX,positionY,index,size,parent}:InputCharData){
    this.renderer.setStyle(this.caretRef.nativeElement,'left',positionX+'px')
    if(parent)
      this.setCurrentElement(parent)
    this.currentElement.caretIndex=index
    this.makeCharVisible(positionX)
  }
  private deleteChar(from=this.currentElement.caretIndex, deleteCount=1){
    if(this.currentElement.caretIndex==-1&&this.currentElement==this.termContainer)
      return
    let prevCharData=this.currentElement.removeChars(from,deleteCount)
    if(prevCharData)
      this.moveCaretTo(prevCharData)
    this.currentElement.updateValidation()
  }

// ------------------STRUCTURING LOGIC------------------
  private appendFraction(){
    let {from,to,prevChars,nextChars}=this.getFractionCharsData()
    this.currentElement.append(from, to-from, {
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
    let prevCharsFrom=(this.currentElement.getPrevSpecialCharData()?.index||-1)+1
    let prevCharsTo=this.currentElement.caretIndex+1
    let prevChars=this.currentElement.terms.slice(prevCharsFrom,prevCharsTo)
    let nextCharsTo=(this.currentElement.getNextSpecialCharData()?.index||this.currentElement.lastCharData.index+1)
    let nextCharsFrom=this.currentElement.caretIndex+1
    let nextChars=this.currentElement.terms.slice(nextCharsFrom,nextCharsTo)
    return{from:prevCharsFrom,to:nextCharsTo,prevChars,nextChars}
  }

  private moveCaretToEmptyFractionChild(from:number,nextChars:Term[],prevChars:Term[]){
    this.cdr.detectChanges()
    let appendedFrac=this.currentElement.renderedChars.get(from)?.asEditableElement as FractionComponent
    if(!nextChars.length)
      this.setCurrentElement(appendedFrac.denominatorComponent?.asEditableElement||this.termContainer)
    if(!prevChars.length)
      this.setCurrentElement(appendedFrac.numeratorComponent?.asEditableElement||this.termContainer)
    this.moveCaretTo(this.currentElement.noCharData)
  }

  private deleteElement(elementIndex:number,residualData:Term[]){
    this.moveContextToActualParent();
    this.currentElement.append(elementIndex,1,...residualData)
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

  private appendParenthesis(parenthesis:string){
    let data=parenthesis=='(' ? this.getForwardParenthesisData():this.getPrevParenthesisData();
    if(!data){
      this.appendSingleChar(parenthesis)
      return;
    }
    let {from,to,terms}=data
    this.appendTerm({type:'parenthesis',parenthesisChildren:terms},from,to-from)
  }

  private getForwardParenthesisData(){
    let nextParenthesis=this.findNextParenthesisChar()
    if(!nextParenthesis)
      return;
    let from=this.currentElement.caretIndex+1,
        to=nextParenthesis.index+1;
    return {from,to,terms:this.currentElement.terms.slice(from,to-1)}
  }

  private findNextParenthesisChar(){
    for(let i=this.currentElement.caretIndex; i<this.currentElement.terms.length; i++){
      let term=this.getRenderedElementAt(i)
      if(term&&term.char==')')
        return term
    }
    return;
  }

  private getPrevParenthesisData(){
    let prevParenthesis=this.findPrevParenthesisChar()
    if(!prevParenthesis)
      return;
    let from=prevParenthesis.index,
        to=this.currentElement.caretIndex+1;
    return{from,to,terms:this.currentElement.terms.slice(from+1,to)}
  }

  private findPrevParenthesisChar(){
    for(let i=this.currentElement.caretIndex; i>=0; i--){
      let term=this.getRenderedElementAt(i)
      if(term&&term.char=='(')
        return term
    }
    return;
  }

  private appendSingleChar(char:string){
    this.appendTerm({char,type:'char'})
  }

  private appendTerm(term:Term,replaceFrom=this.currentElement.caretIndex+1,deleteCount=0){
    this.currentElement.append(replaceFrom,deleteCount,term)
    this.cdr.detectChanges()
    let appendedTerm=this.currentElement.renderedChars.get(this.currentElement.caretIndex+1)?.asEditableElement
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
    let renderedFunction=this.currentElement.renderedChars.get(this.currentElement.caretIndex+1-functionName.length)?.asEditableElement as FunctionComponent
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

