import {InputEditableElement} from "../input-editable-element.class";
import {ChangeDetectorRef} from "@angular/core";
import {InputCharData} from "../../models/input-char-data.model";
import {Term} from "../../models/terms/term.model";
import {RootComponent} from "../../components/root/root.component";

export class RootAdder{
  constructor(
    private currentElement:InputEditableElement,
    private cdr:ChangeDetectorRef
  ) { }

  public appendSimpleRoot(){
    return this.appendRoot(this.currentElement.nextIndex,0,{type:"root",rootChildren:[]})
  }
  public appendEditableRadicalRoot(){
    return this.appendRoot(this.currentElement.nextIndex,0,{type:"root",rootChildren:[],radicalTerms:[]})
  }

  private appendRoot(replaceFrom=this.currentElement.nextIndex, deleteCount=0,root:Term):InputCharData{
    this.currentElement.replace(replaceFrom,deleteCount,[root])
    this.cdr.detectChanges()

    let appendedRoot=this.currentElement.getRenderedChar(this.currentElement.nextIndex)?.asEditableElement as RootComponent
    return (appendedRoot.argumentComponent || appendedRoot.mainComponent).noCharData
  }
}
