import {AfterViewInit, Directive, Input, OnInit, QueryList, ViewChildren} from "@angular/core";
import {InputEditableElement} from "../input-editable-element/input-editable-element.directive";
import {Subject} from "rxjs";
import {Term} from "../../models/terms/term.model";


@Directive()
export abstract class InputMathElement<TermType> implements AfterViewInit{

  @ViewChildren(InputEditableElement) private editableSections!:QueryList<InputEditableElement>;
  @Input() public parent!:InputEditableElement
  @Input() public term!:TermType
  @Input() public index!:number

  private currentSection=0
  public validationRequester=new Subject<void>()

  public get firstSection(){
    return this.editableSections.get(0) as InputEditableElement
  }

  public get lastSection(){
    return this.editableSections.get(this.editableSections.length-1) as InputEditableElement
  }

  public sectionAt(index:number){
    return this.editableSections.get(index) as InputEditableElement
  }

  get nextSection(){
    return this.editableSections.get(this.currentSection+1) as InputEditableElement
  }

  get previousSection(){
    return this.editableSections.get(this.currentSection-1) as InputEditableElement
  }


  ngAfterViewInit() {
    this.editableSections.forEach(section=>{
      section.validationRequester.subscribe(() => this.validationRequester.next())
    })
  }
}
