import {AfterViewInit, Directive, InjectionToken, Input, QueryList, SkipSelf, ViewChildren} from "@angular/core";
import {Subject} from "rxjs";
import {
  EditableTermContainerComponent
} from "../../ui/molecules/editable-term-container/editable-term-container.component";
import {ContainerLocation} from "../../core/models/locations/container-location.model";

@Directive()
export abstract class InputMathElement<TermType> implements AfterViewInit{
  @ViewChildren(EditableTermContainerComponent) private editableSections!:QueryList<EditableTermContainerComponent>;
  @Input() public term!:TermType
  @Input() public index!:number

  public currentSection=0
  public validationRequester=new Subject<void>()
  constructor(@SkipSelf() public parent:EditableTermContainerComponent) { }

  public get firstSection(){
    return this.editableSections.get(0) as EditableTermContainerComponent
  }

  public get lastSection(){
    return this.editableSections.get(this.editableSections.length-1) as EditableTermContainerComponent
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
