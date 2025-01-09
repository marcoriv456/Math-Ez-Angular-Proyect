import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {InputEditableElement} from "../../classes/input-editable-element.class";
import {WarningsService} from "../../services/warnings/warnings.service";
import {WarningRenderData} from "../../models/char-validation/warning-render-data.model";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {TermValidationData} from "../../models/char-validation/validation-data.model";
import {TermWarningMessageData} from "../../models/char-validation/warning-message-data.model";

@Component({
  selector: 'char',
  templateUrl: './char.component.html',
  styleUrl: './char.component.css'
})
export class CharComponent implements OnDestroy,OnInit{
  @Input()
  char!:string
  @HostBinding('class')
  get validClass(){
    return this.valid ? 'valid':'invalid'
  }

  private ref=inject(ElementRef).nativeElement as HTMLElement
  private inputUtilitiesService=inject(CharClickedNotifierService)
  private variableProvider=inject(VariableProviderService)
  private warningsService=inject(WarningsService)
  private isMouseOver=false
  private valid=true
  private letterRegexp=/^[a-zA-z]$/

  get notValidData():WarningRenderData{
    return {
      messages:[{message:`La variable '${this.char}' no es reconocible.`,type:'fully-invalid'}],
      position:{
        x:this.ref.getBoundingClientRect().left+(this.ref.offsetWidth/2),
        y:this.ref.getBoundingClientRect().top
      }
    }
  }


  @HostListener('mouseover', ['$event'])
  onMouseOver(event:MouseEvent){
    if(this.valid)
      return;
    event.stopPropagation()
    this.warningsService.showWarning.emit(this.notValidData)
    this.isMouseOver=true
  }
  @HostListener('mouseleave')
  onMouseLeave(){
    if(this.valid)
      return;
    this.warningsService.hideWarning.emit()
    this.isMouseOver=false
  }
  ngOnDestroy() {
    if(this.isMouseOver)
      this.warningsService.hideWarning.emit()
  }
  ngOnInit() {
    this.validate()
  }

  validate(){
    if(!this.letterRegexp.test(this.char))
      return;
    this.valid=this.variableProvider.variableNames.includes(this.char)
  }
}

