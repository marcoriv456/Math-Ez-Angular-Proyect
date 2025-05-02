import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {WarningsService} from "../../../core/services/warnings/warnings.service";
import {warningAdviceAnimation} from "../../animations/warning-advice.animation";
import {TermValidationMessage} from "../../../core/validation/models/term-validation-message.model";
import {TermValidationWarningRenderData} from "../../../core/validation/models/term-validation-warning-render-data.model";

@Component({
  selector: 'term-validation-warning',
  templateUrl: './term-validation-warning.component.html',
  styleUrl: './term-validation-warning.component.css',
  animations: [warningAdviceAnimation]
})
export class TermValidationWarningComponent implements OnInit{
  protected showingWarning=false
  protected warningMessages:TermValidationMessage[]=[]
  protected warningStyleData={ left:'50%', top:'0' }
  private warningsService=inject(WarningsService)
  private ref=inject(ElementRef).nativeElement as HTMLElement

  ngOnInit() {
    this.warningsService.showWarning.subscribe(this.showWarning.bind(this))
    this.warningsService.hideWarning.subscribe(this.hideWarning.bind(this))
  }

  private showWarning({messages,position}:TermValidationWarningRenderData){
    this.showingWarning=true

    this.warningStyleData.left=position.x-this.ref.getBoundingClientRect().left + 'px'
    this.warningStyleData.top = position.y-this.ref.getBoundingClientRect().top + 'px'

    this.warningMessages=messages
  }

  private hideWarning(){
    this.showingWarning=false
  }
}
