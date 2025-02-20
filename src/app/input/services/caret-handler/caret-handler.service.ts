import {inject, Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {InputCharData} from "../../models/input-char-data.model";
import {ContextHandlerService} from "../context-handler/context-handler.service";
import {CharClickedNotifierService} from "../char-clicked-notifier/char-clicked-notifier.service";
import {CaretIndexService} from "../caret-index/caret-index.service";

@Injectable()
export class CaretHandlerService {
  constructor() {
    this.charClickedNotifier.charClicked.subscribe(charClickedData=>this.move(charClickedData))
  }

  private readonly movementEmitter=new Subject<InputCharData>()

  private readonly indexService=inject(CaretIndexService)
  private readonly contextHandler=inject(ContextHandlerService)
  private readonly charClickedNotifier=inject(CharClickedNotifierService)

  public handleKey(key:string, ctrlKey:boolean){

    if(key=='ArrowLeft' && ctrlKey)
      this.moveToPrevIrregular()
    else if(key=='ArrowRight' && ctrlKey)
      this.moveToNextIrregular()
    else if(key=='Home' && ctrlKey)
      this.moveToFirstInMain()
    else if(key=='End' && ctrlKey)
      this.moveToLastInMain()
    else if(key=="ArrowLeft")
      this.moveBackward()
    else if(key=='ArrowRight')
      this.moveForward()
    else if(key=='Home')
      this.moveToFirst()
    else if(key=='End')
      this.moveToLast()
  }

  public moveForward(){
    const forward=this.contextHandler.requestForwardContextData()
    this.move(forward)
  }

  public moveBackward(){
    const backward=this.contextHandler.requestBackwardContextData()
    this.move(backward)
  }

  public moveToFirst(){
    const first=this.contextHandler.firstCharData
    this.move(first)
  }

  public moveToLast(){
    const last=this.contextHandler.lastCharData
    this.move(last)
  }

  public moveToFirstInMain(){
    const firstInMain=this.contextHandler.mainContainerNoCharData
    this.move(firstInMain)
  }

  public moveToLastInMain(){
    const lastInMain=this.contextHandler.mainContainerLastCharData
    this.move(lastInMain)
  }

  public moveToNextIrregular(){
    this.move(this.contextHandler.nextIrregularCharDataToMoveAt)
  }

  public moveToPrevIrregular(){
    this.move(this.contextHandler.prevIrregularCharToMoveAt)
  }

  public move(data:InputCharData){
    this.movementEmitter.next(data)
    this.contextHandler.contextElement(data.parent)
    this.indexService.index=data.index
  }

  public listenMoves(callback:(data:InputCharData)=>void){
    this.movementEmitter.subscribe(callback)
  }
}
