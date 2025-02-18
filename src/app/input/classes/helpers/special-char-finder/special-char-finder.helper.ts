import {Term} from "../../../models/terms/term.model";

export class SpecialCharFinder{
  private readonly irregularCharRegexp=/[^a-zA-Z\d]/

  constructor(
    private readonly index:number,
    private readonly terms:Term[]
  ){}

  public findNextIndexToMoveAt(){
    const result=this.findNext()

     if(result && result-1!==this.index)
      return result-1

    return result
  }

  public findPreviousIndexToMoveAt(){
    let result=this.findPrevious()

    if(result&&result==this.index)
       return result-1

    return result
  }


  public findNext(){
    for (let i = this.index + 1; i < this.terms.length; i++) {
      const term = this.terms[i]
      if (term && this.isTermIrregular(term))
        return i
    }
    return this.terms.length;
  }

  public findPrevious(){
    for(let i=this.index; i>=0;i--){
      const term=this.terms[i]
      if(term && this.isTermIrregular(term))
        return i
    }
    return -1;
  }

  private isTermIrregular(term:Term){
    if(term.type!=='char')
      return true;
    return this.irregularCharRegexp.test(term.char)
  }

}
