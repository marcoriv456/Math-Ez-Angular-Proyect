import {Term} from "../../models/terms/term.model";
import {FunctionComponent} from "../../components/function/function.component";
import {InputEditableElement} from "../input-editable-element.class";
import {ChangeDetectorRef} from "@angular/core";

export class FunctionAdder{
  constructor(
    private recognizableFunctions:string[],
    private currentElement:InputEditableElement,
    private cdr:ChangeDetectorRef
  ) { }

  private from!:number
  private to!:number
  private generatedFunctionTerm!:Term
  private functionCoincidenceIndices:RegExpIndicesArray|undefined
  private foundFunctionName!:string

  public appendFunction(){
    this.currentElement.replace(this.from,this.to-this.from+1,[this.generatedFunctionTerm])
    this.cdr.detectChanges()
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
    this.generatedFunctionTerm={
      type:'function',
      functionName:this.foundFunctionName,
      functionChildren:[],
      argumentTerms:this.foundFunctionName=='log'?[]:undefined
    }
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

}
