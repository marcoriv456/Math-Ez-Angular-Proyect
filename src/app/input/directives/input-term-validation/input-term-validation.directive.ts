import {Directive, ElementRef, HostBinding, HostListener, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {TermValidationData} from "../../validation/models/term-validation-data.model";
import {TermValidator} from "../../validation/abstracts/validator.abstract";
import {WarningsService} from "../../services/warnings/warnings.service";
import {Term} from "../../models/terms/term.model";
import {Subject} from "rxjs";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {validTermValidation} from "../../validation/default-values/valid-term-validation";

@Directive({
  selector: '[inputTermValidation]'
})
export class InputTermValidationDirective implements OnInit, OnDestroy{
// --------------VALIDATION LOGIC------------------
  @Input('inputTermValidation')
  public input!:{term:Term, validatorClass:{new (term:Term):TermValidator},validationRequester?:Subject<void>}

  private readonly ref=inject(ElementRef).nativeElement as HTMLElement
  private readonly warningsService=inject(WarningsService)

  private validationData!:TermValidationData
  private isMouseOver=false


  private get validationRequester(){
    return this.input.validationRequester
  }

  private get validatorInstance():TermValidator{
    return new this.validatorClass(this.term)
  }
  private get validatorClass(){
    return this.input.validatorClass
  }

  private get term(){
    return this.input.term
  }

  private get left(){
    return this.ref.getBoundingClientRect().left+(this.ref.offsetWidth/2)
  }

  private get top(){
    return this.ref.getBoundingClientRect().top
  }

  ngOnInit() {
    this.updateValidation()
    this.validationRequester?.subscribe(()=>this.updateValidation())
  }

  ngOnDestroy() {
    if(this.isMouseOver)
      this.emitHideWarning()
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

  public updateValidation(){
    this.setValidationData(this.validatorInstance.validate())
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

  private setValidationData(data:TermValidationData){
    this.validationData=data
  }
  // --------------VALIDATION LOGIC------------------
}
