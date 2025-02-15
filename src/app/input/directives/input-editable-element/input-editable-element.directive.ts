import {Directive, ElementRef, HostBinding, HostListener, inject, Input, OnDestroy} from '@angular/core';
import {TermContainerComponent} from "../../components/term-container/term-container.component";
import {Term} from "../../models/terms/term.model";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {InputCharData} from "../../models/input-char-data.model";
import {WarningsService} from "../../services/warnings/warnings.service";
import {TermValidationData} from "../../validation/models/term-validation-data.model";
import {TermValidator} from "../../validation/abstracts/validator.abstract";
import {Subject} from "rxjs";

@Directive()
export abstract class InputEditableElement{

  protected abstract termContainer: TermContainerComponent
  @Input()
  public terms!:Term[]
  @Input()
  public parent!:InputEditableElement|undefined
  @Input()
  public index!:number

  public readonly ref=inject(ElementRef).nativeElement as HTMLElement

  public readonly editable:boolean=true
  public caretIndex=-1

  @HostBinding('class.selected')
  public selected=false
  @HostBinding('class.empty')
  private get isEmpty(){
    return this.terms && this.terms.length==0 && this.editable
  }

  public readonly validationRequester=new Subject<void>()


  public append(terms:Term[], index:number){
    this.terms.splice(index,0,...terms)
    this.updateValidation()
  }

  public replace(from:number, deleteCount=1,terms:Term[]){
    this.terms.splice(from,deleteCount,...terms)
    this.updateValidation()
  }

  public delete(from:number,deleteCount=1){
    this.terms.splice(from,deleteCount)
    this.updateValidation()
  }

  public get renderedChars(){
    return this.termContainer.renderedChars
  }

  public get positionY(): number {
    return this.ref.getBoundingClientRect().top;
  }

  public getRenderedChar(index:number){
    return this.renderedChars.get(index)
  }

  public getCharData(index:number){
    return this.getRenderedChar(index)?.data
  }

  public get nextCharData(){
    return this.getCharData(this.caretIndex+1)||this.lastCharData
  }

  public get lastCharData(){
    return this.renderedChars.get(this.renderedChars.length-1)?.data||this.noCharData
  }

  public get noCharData():InputCharData{
    return {index:-1,positionX:this.positionX, parent:this}
  }

  public get nextIndex(){
    return this.caretIndex+1
  }

  public get size():number{
    return this.ref.offsetHeight
  }

  public get toString(){
    return this.terms.map(child=> child.type=='char' ? child.char :'~').join('')
  }

  public updateValidation(){
    this.validationRequester.next()
  }

  protected get positionX(): number {
    let parent=this.ref.parentElement
    let leftPosition=this.ref.offsetLeft
    while(parent && !(parent.tagName=='APP-INPUT')){
      leftPosition+=parent.offsetLeft
      parent=parent.parentElement
    }
    return leftPosition
  }
}
