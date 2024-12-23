import {TermWarningMessageData} from "./warning-message-data.model";

export interface WarningRenderData{
  messages:TermWarningMessageData[]
  position:{x:number, y:number}
}
