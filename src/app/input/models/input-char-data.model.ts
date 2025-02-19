import {InputEditableElement} from "../directives/input-editable-element/input-editable-element.directive";
import {EditableTermContainerComponent} from "../components/editable-term-container/editable-term-container.component";

export interface InputCharData{
  positionX:number
  index:number
  parent?:EditableTermContainerComponent
}
