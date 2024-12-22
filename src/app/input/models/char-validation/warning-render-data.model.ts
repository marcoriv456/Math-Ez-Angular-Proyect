import {WarningMessageData} from "./warning-message-data.model";

export interface WarningRenderData{
  messages:WarningMessageData[]
  position:{x:number, y:number}
}
