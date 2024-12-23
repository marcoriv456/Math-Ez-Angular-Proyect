import {TermWarningMessageData} from "./warning-message-data.model";

export interface TermValidationData {
  isValid:boolean
  type?:'partially-invalid'|'fully-invalid'
  messages:TermWarningMessageData[]
}
