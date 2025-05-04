import {AfterViewInit, Directive, Input, Optional, QueryList, SkipSelf, ViewChildren} from "@angular/core";
import {Subject} from "rxjs";
import {ContainerLocation} from "../models/locations/container-location.model";
import {EditableTermContainer} from "./editable-term-container.abstract";

@Directive()
export abstract class InputMathElement<TermType> implements AfterViewInit{
  @ViewChildren(EditableTermContainer) private editableSections!:QueryList<EditableTermContainer>;
  @Input() public term!:TermType
  @Input() public index!:number

  public currentSection=0
  public validationRequester=new Subject<void>()
  constructor(@SkipSelf() @Optional() public parent:EditableTermContainer) { }

  public get firstSection(){
    return this.editableSections.get(0) as EditableTermContainer
  }

  public get lastSection(){
    return this.editableSections.get(this.editableSections.length-1) as EditableTermContainer
  }

  public sectionAt(index:number){
    return this.editableSections.get(index)
  }

  get nextSection(){
    return this.editableSections.get(this.currentSection+1)
  }

  get previousSection(){
    return this.editableSections.get(this.currentSection-1)
  }

  public getContainerLocation(index:number):ContainerLocation{
    return {
      nextExist:!!this.sectionAt(index+1),
      prevExist:!!this.sectionAt(index-1)
    }
  }

  ngAfterViewInit() {
    this.editableSections.forEach(section=>{
      section.addChangesListener(() => this.validationRequester.next())
    })
  }
}
