import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {warningAdviceAnimation} from "../../animations/warning-advice.animation";
import {TermValidationMessage} from "../../../core/validation/models/term-validation-message.model";
import {TermValidationWarningRenderData} from "../../../core/validation/models/term-validation-warning-render-data.model";
import {InputEventBusService} from "../../../core/services/input-event-bus/input-event-bus.service";
import {WarningHideRequestEvent} from "../../../core/models/events/warnings/warning-hide-request.event";
import {WarningShowRequestEvent} from "../../../core/models/events/warnings/warning-show-request.event";

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
  private ref=inject(ElementRef).nativeElement as HTMLElement
  private eventBus = inject(InputEventBusService);

  ngOnInit() {
    this.eventBus.on(WarningShowRequestEvent).subscribe(event => this.showWarning(event.renderData));
    this.eventBus.on(WarningHideRequestEvent).subscribe(() => this.hideWarning());
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
