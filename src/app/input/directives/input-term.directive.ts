import {
  Directive,
  ElementRef, HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {InputUtilitiesService} from "../services/caret-positioning/input-utilities.service";
import {InputEditableElement} from "../models/input-editable-element.class";
import {InputCharData} from "../char/char.component";
import {WarningsService} from "../services/warnings/warnings.service";

@Directive({
  selector: '[inputTerm]'
})
export class InputTermDirective implements OnChanges{
  @Input('inputTerm')
  input!:{char:string, index:number,editableElementRef?:InputEditableElement,parent:InputEditableElement}

  ref=inject(ElementRef).nativeElement as HTMLElement
  caretPositioningService=inject(InputUtilitiesService)



  get data():InputCharData{
    return {
      positionX:this.rightPosition,
      positionY:this.topPosition,
      index:this.index,
      size:this.size
    }
  }

  get char(){
    return this.input.char
  }
  get index(){
    return this.input.index
  }
  get asEditableElement(){
    return this.input.editableElementRef
  }
  get parent(){
    return this.input.parent
  }

  @HostListener('click',['$event'])
  onClick(event:MouseEvent){
    event.stopPropagation()
    let {offsetX}=event
    let wasClickOnLeftSide=this.wasClickOnLeftSide(offsetX)
    let dataToSend=this.data
    if(wasClickOnLeftSide){
      dataToSend.positionX=this.leftPosition
      dataToSend.index-=1
    }
    dataToSend.parent=this.parent
    this.caretPositioningService.charClicked.emit(dataToSend)
  }

  private wasClickOnLeftSide(clickOffset:number){
    return this.ref.offsetWidth/2>clickOffset
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }



  private get rightPosition(){
    return this.leftPosition+this.ref.offsetWidth
  }
  private get leftPosition(){
    return this.ref.getBoundingClientRect().left-this.caretPositioningService.inputPositionX
  }
  private get topPosition(){
    return this.ref.getBoundingClientRect().top-this.caretPositioningService.inputPositionY
  }
  private get size(){
    return this.ref.offsetHeight
  }

  // ------------------VARIABLE CHECKING LOGIC------------------
  warningsService=inject(WarningsService)
  @HostBinding('class.invalid')
  invalid=false
  setValid(valid:boolean){
    this.invalid=!valid
  }
  @HostListener('mouseover')
  onMouseOver(){
    if(!this.invalid)
      return;
    this.warningsService.showWarning.emit({messages:[`No se encontro a la variable: "${this.char}"`],position:this.data})
  }
  @HostListener('mouseleave')
  onMouseLeave(){
    if(!this.invalid)
      return;
    this.warningsService.hideWarning.emit()
  }
  // ------------------VARIABLE CHECKING LOGIC------------------
}
