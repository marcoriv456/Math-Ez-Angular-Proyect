import {Term} from "../../../core/models/terms/term.model";

export class SpecialCharFinder{
  private readonly irregularCharRegexp=/[^a-zA-Z\d]/

  constructor(
    private readonly index:number,
    private readonly terms:Term[]
  ){}

  public findNextIndexToMoveAt(){
    const result=this.findNext()

    const isIndexBehindAnIrregularCharacter=this.index===result-1
    const isResultTheLastCharacter =result==this.terms.length-1

    if(!isIndexBehindAnIrregularCharacter && !isResultTheLastCharacter){
      return result-1
    }

    return result
  }

  public findPreviousIndexToMoveAt(){
    let result=this.findPrevious()

    const isIndexAlreadyInAnIrregularCharacter=this.index===result

    if(isIndexAlreadyInAnIrregularCharacter)
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
