import {
  Directive,
  ElementRef,
  Host,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Optional
} from '@angular/core';
import {TermValidationData} from "../../validation/models/term-validation-data.model";
import {TermValidator} from "../../validation/abstracts/validator.abstract";
import {WarningsService} from "../../core/services/warnings/warnings.service";
import {Term} from "../../models/terms/term.model";
import {Subject} from "rxjs";
import {InputMathElement} from "../input-math-element/input-math-element.abstract";
import {CharComponent} from "../../components/char/char.component";
import {
  EditableTermContainerComponent
} from "../../components/editable-term-container/editable-term-container.component";

@Directive({
  selector: '[inputTermValidation]'
})
export class InputTermValidationDirective implements OnInit, OnDestroy{
  @Input('inputTermValidation')
  public validatorClass!:{new (term:Term):TermValidator}

  private term!:Term
  private validationRequester?:Subject<void>
  private validationData!:TermValidationData
  private isMouseOver=false

  private readonly ref=inject(ElementRef).nativeElement as HTMLElement
  private readonly warningsService=inject(WarningsService)

  constructor(
    @Host() @Optional() private mathElementHost:InputMathElement<any>|null,
    @Host() @Optional() private containerHost:EditableTermContainerComponent|null,
    @Host() @Optional() private charHost:CharComponent|null
  ) { }

  ngOnInit() {
    this.setupWithHostData()
    this.updateValidation()
    this.validationRequester?.subscribe(()=>this.updateValidation())
  }

  ngOnDestroy() {
    if(this.isMouseOver)
      this.emitHideWarning()
  }

  private get validatorInstance():TermValidator{
    return new this.validatorClass(this.term)
  }

  private get left(){
    return this.ref.getBoundingClientRect().left+(this.ref.offsetWidth/2)
  }

  private get top(){
    return this.ref.getBoundingClientRect().top
  }

  private setupWithHostData(){
    if(!this.charHost && !this.mathElementHost && !this.containerHost)
      throw new Error('Misplaced directive, host is not a Math Term, Container nor a character')

    if(this.charHost)
      this.term= {type:'char', char:this.charHost.char}

    else if(this.mathElementHost) {
      this.term=this.mathElementHost.term
      this.validationRequester=this.mathElementHost.validationRequester
    }

    else if(this.containerHost){
      this.term=this.containerHost.mathElement.term
      this.validationRequester=this.containerHost.mathElement.validationRequester
    }
  }

  @HostBinding('class')
  private get validityClassBinding(){
    return this.validationData.type
  }

  @HostListener('mouseover')
  private onMouseOver(){
    if(this.validationData.isValid)
      return;
    this.emitShowWarning()
    this.isMouseOver=true
  }

  @HostListener('mouseleave')
  private onMouseLeave(){
    if(this.validationData.isValid)
      return;
    this.emitHideWarning()
    this.isMouseOver=false
  }

  private updateValidation(){
    this.validationData=this.validatorInstance.validate()
    if(this.isMouseOver)
      this.validationData.isValid ? this.emitHideWarning() : this.emitShowWarning()
  }

  private emitShowWarning(){
    this.warningsService.showWarning.emit({
      messages:this.validationData.messages||[],
      position:{x:this.left,y:this.top}})
  }

  private emitHideWarning(){
    this.warningsService.hideWarning.emit()
  }

}
