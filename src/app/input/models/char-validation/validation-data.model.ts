import {WarningMessageData} from "./warning-message-data.model";

export interface ValidationData{
  isValid:boolean
  type?:'partially-invalid'|'fully-invalid'
  messages?:WarningMessageData[]
}
