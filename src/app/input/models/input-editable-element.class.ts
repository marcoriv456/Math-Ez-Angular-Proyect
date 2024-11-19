import {QueryList} from "@angular/core";
import {InputTermDirective} from "../directives/input-term.directive";
import {InputCharData} from "../char/char.component";
import {InputUtilitiesService} from "../services/caret-positioning/input-utilities.service";
import {Term} from "./term.model";

export abstract class InputEditableElement{
  abstract parent?:InputEditableElement
  abstract renderedChars:QueryList<InputTermDirective>
  abstract ref:HTMLElement
  abstract terms:Term[]
  abstract index:number
  abstract inputUtilitiesService:InputUtilitiesService
  get positionX(): number {
    return this.ref.getBoundingClientRect().left-this.inputUtilitiesService.inputPositionX;
  }

  get positionY(): number {
    return this.ref.getBoundingClientRect().top-this.inputUtilitiesService.inputPositionY;
  }

  getCharData(index:number){
    return this.renderedChars.get(index)?.data
  }

  getNextSpecialCharFixedData(caretIndex:number):InputCharData{
    let nextSpecialChar=this.getNextSpecialCharData(caretIndex)

    if(nextSpecialChar && nextSpecialChar.index-1!==caretIndex)
      nextSpecialChar=this.renderedChars.get(nextSpecialChar.index-1)?.data

    return nextSpecialChar||this.lastCharData
  }

  getNextSpecialCharData(caretIndex:number){
    return this.findSpecialChar(
      caretIndex+1,
      this.renderedChars.length,
      i=>i+1,
      (from, to)=>from<to
    )
  }

  getPrevSpecialCharFixedData(caretIndex:number){
    let prevSpecialChar=this.getPrevSpecialCharData(caretIndex)

    if(prevSpecialChar&&prevSpecialChar.index==caretIndex)
      prevSpecialChar=this.renderedChars.get(prevSpecialChar.index-1)?.data

    return prevSpecialChar||this.noCharData
  }

  getPrevSpecialCharData(caretIndex:number){
    return this.findSpecialChar(
      caretIndex,
      0,
      i=>i-1,
      (from,to)=>from>=to);
  }

  protected findSpecialChar(from:number,to:number,stepF:(i:number)=>number,conditionF:(from:number,to:number)=>boolean):InputCharData|undefined{
    let renderedChars=this.renderedChars
    let i=from
    while (conditionF(i,to)){
      let char=renderedChars.get(i)
      if(char && this.isCharIrregular(char.char))
        return char.data
      i=stepF(i)
    }
    return undefined
  }
  protected isCharIrregular(char:string){
    return /[^a-zA-Z\d]/.test(char)
  }

  get lastCharData(){
    return this.renderedChars.get(this.renderedChars.length-1)?.data||this.noCharData
  }
  get noCharData():InputCharData{
    return {index:-1,positionX:this.positionX,positionY:this.positionY,size:this.size}
  }
  get fontSize():number{
    return this.parent?.fontSize||3
  }
  get fontSizeToBind(){
    return this.fontSize+'rem'
  }
  get size():number{
    return this.ref.offsetHeight
  }
  removeChar(from:number, deleteCount=1):InputCharData|undefined{
    if(from==-1)
      return
    this.terms.splice(from,deleteCount)
    return this.getCharData(from-1)||this.noCharData
  }
  // ------------------VARIABLE CHECKING LOGIC------------------
  get value(){
    return this.terms.map(child=>{
      if(child.type=='char')
        return child.char
      return '/'+child.type+'/'
    }).join('')
  }
  // ------------------VARIABLE CHECKING LOGIC------------------

}
