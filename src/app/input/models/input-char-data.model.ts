import {InputEditableElement} from "../directives/input-editable-element/input-editable-element.directive";

export interface InputCharData{
  positionX:number
  positionY:number
  index:number
  size:number
  parent?:InputEditableElement
}
