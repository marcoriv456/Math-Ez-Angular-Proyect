import {Term} from "../../models/terms/term.model";
import {FunctionComponent} from "../../components/function/function.component";
import {ChangeDetectorRef} from "@angular/core";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";

export class FunctionAdder{
  constructor(
    private recognizableFunctions:string[],
    private currentElement:InputEditableElement,
    private cdr:ChangeDetectorRef
  ) { }

  private from!:number
  private to!:number
  private functionCoincidenceIndices:RegExpIndicesArray|undefined
  private foundFunctionName!:string
  private functionArgumentTerms:Term[]|undefined

  public appendFunction(){
    this.checkParenthesisAutofillAvailability()
    this.currentElement.replace(this.from,this.to-this.from+1,[this.generateFunctionTerm()])
    this.cdr.detectChanges()

    if(this.functionArgumentTerms)
      return this.currentElement.nextCharData

    const renderedFunction=this.currentElement.getRenderedChar(this.currentElement.nextIndex-this.foundFunctionName.length)?.asEditableElement as FunctionComponent,
          elementToContextAt=renderedFunction.argumentComponent || renderedFunction.mainContainer
    return elementToContextAt.noCharData
  }

  public searchFunctionWrittenReferences(){
    this.foundFunctionCoincidenceIndices()
    this.setupValues()
    return !!this.functionCoincidenceIndices
  }

  private setupValues(){
    if(!this.functionCoincidenceIndices)
      return;

    this.from=this.functionCoincidenceIndices[0][0]
    this.to=this.functionCoincidenceIndices[0][1]-1
  }

  private foundFunctionCoincidenceIndices(){
    let coincidence:RegExpExecArray|null=null,
      foundFunction='',
      currentElementValue=this.currentElement.toString
    for(let functionName of this.recognizableFunctions){
      let functionRegexp=new RegExp(functionName,'id')
      coincidence=functionRegexp.exec(currentElementValue)
      foundFunction=functionName
      if(coincidence)
        break;
    }
    this.functionCoincidenceIndices=coincidence?.indices
    this.foundFunctionName=foundFunction
  }

  private checkParenthesisAutofillAvailability(){
    const nextTerm= this.currentElement.terms[this.to+1]
    if(!nextTerm || nextTerm.type!=='parenthesis')
      return;
    this.to++
    this.functionArgumentTerms=nextTerm.parenthesisChildren
  }

  private generateFunctionTerm():Term{
    return{
      type:"function",
      functionName:this.foundFunctionName,
      functionChildren:this.functionArgumentTerms||[],
      argumentTerms:this.foundFunctionName=='log' ? [] : undefined
    }
  }

}
