import {WarningMessageData} from "../../directives/input-term.directive";

export interface ValidationData{
  isValid:boolean
  type?:'partially-invalid'|'fully-invalid'
  messages?:WarningMessageData[]
}
