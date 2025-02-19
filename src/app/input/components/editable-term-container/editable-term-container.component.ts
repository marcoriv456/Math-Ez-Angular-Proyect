import {Component, ElementRef, HostBinding, inject, Input, Optional, SkipSelf, ViewChild} from '@angular/core';
import {TermContainerComponent} from "../term-container/term-container.component";
import {Term} from "../../models/terms/term.model";
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {Subject} from "rxjs";
import {ContainerLocation} from "../../models/container-location.model";
import {TermLocation} from "../../models/term-location.model";
import {InputTermLocation} from "../../models/location/input-term-location.model";
import {LayeredTermLocation} from "../../models/location/input-layer-location.model";

@Component({
  selector: 'editable-term-container',
  templateUrl: './editable-term-container.component.html',
  styleUrls: ['./editable-term-container.component.css','../../assets/editable-elements-styles.css']
})
export class EditableTermContainerComponent{
  @Input() terms!:Term[]
  @Input() index!:number

  @ViewChild(TermContainerComponent) private termContainer!:TermContainerComponent
  public caretIndex:number=-1

  constructor(@SkipSelf() @Optional() public mathElement:InputMathElement<any>) {}

  private readonly changeEmitter = new Subject<void>()
  private readonly ref=inject(ElementRef).nativeElement as HTMLElement

  @HostBinding('class.selected') public selected=false
  @HostBinding('class.empty')
  private get isEmpty(){
    return this.terms && this.terms.length==0
  }

  public addChangesListener(callback:()=>void){
    this.changeEmitter.subscribe(callback)
  }

  public append(terms:Term[], index:number){
    this.terms.splice(index,0,...terms)
    this.emitChange()
  }

  public replace(from:number, deleteCount=1,terms:Term[]){
    this.terms.splice(from,deleteCount,...terms)
    this.emitChange()
  }

  public delete(from:number,deleteCount=1){
    this.terms.splice(from,deleteCount)
    this.emitChange()
  }

  public getCharData(index:number){
    return this.termContainer.renderedChars.get(index)?.data
  }

  public get noCharData(){
    return {index:-1,positionX:this.positionX, parent:this}
  }

  public get lastCharData(){
    return this.getCharData(this.termContainer.renderedChars.length-1)||this.noCharData
  }

  public get size():number{
    return this.ref.offsetHeight
  }

  public get positionX(): number{
    let parent=this.ref.parentElement
    let leftPosition=this.ref.offsetLeft
    while(parent && !(parent.tagName=='APP-INPUT')){
      leftPosition+=parent.offsetLeft
      parent=parent.parentElement
    }
    return leftPosition
  }

  public get clientY(): number {
    return this.ref.getBoundingClientRect().top;
  }

  private get location():ContainerLocation{
    return this.mathElement?.getContainerLocation(this.index)||{isThisMain:true}
  }

  public getTermLocation(index: number): LayeredTermLocation {
    return {
      character: {
        prev: this.terms[index - 1]?.type,
        actual: this.terms[index]?.type,
        next: this.terms[index + 1]?.type
      },
      container:this.location
    }
  }

  public getElement(index:number){
    return this.termContainer.renderedChars.get(index)?.asMathElement
  }

  private emitChange(){
    this.changeEmitter.next()
  }



}
