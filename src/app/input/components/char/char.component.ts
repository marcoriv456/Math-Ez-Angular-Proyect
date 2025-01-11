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
export class CharComponent{
  @Input()
  char!:string
  public variableProvider=inject(VariableProviderService)
}

