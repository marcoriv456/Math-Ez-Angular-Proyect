import {InputElementLocation} from "../../../core/models/locations/input-element-location.model";
import {ContextAction} from "../../../core/models/actions/context-action.enum";

export class InputContextManager {
  private readonly nextCharType: string | undefined
  private readonly actualCharType: string | undefined

  private readonly nextContainerExist?: boolean
  private readonly prevContainerExist?: boolean

  private readonly actualContainerIsMain?: boolean

  constructor({character, container}: InputElementLocation,) {
    this.nextCharType = character.next
    this.actualCharType = character.actual

    this.nextContainerExist = container.nextExist
    this.prevContainerExist = container.prevExist
    this.actualContainerIsMain = container.isThisMain
  }

  public next() {
    if(this.nextCharType!=='char' && this.nextCharType !== undefined)
      return ContextAction.ContextNextTerm

    if (this.nextCharType == 'char')
      return ContextAction.MoveToNextChar

    if(this.nextCharType==null && this.nextContainerExist)
      return ContextAction.ContextNextContainer

    if(this.nextCharType==null && this.actualContainerIsMain)
      return ContextAction.MoveToLastChar

    return ContextAction.ContextOutByRight
  }

  public prev(){
    if(this.actualCharType !=='char' && this.actualCharType != undefined)
      return ContextAction.ContextActualTerm

    if (this.actualCharType == 'char')
      return ContextAction.MoveToPrevChar

    if(this.actualCharType==null && this.prevContainerExist)
      return ContextAction.ContextPrevContainer

    if(this.actualCharType == null && this.actualContainerIsMain)
      return ContextAction.MoveToFirstChar

    return ContextAction.ContextOutByLeft
  }
}
