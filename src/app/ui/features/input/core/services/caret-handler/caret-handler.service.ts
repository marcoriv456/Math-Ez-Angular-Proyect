import {ElementRef, inject, Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {InputCharData} from "../../models/input-char-data.model";
import {ContextHandlerService} from "../context-handler/context-handler.service";
import {CaretIndexService} from "../caret-index/caret-index.service";
import {CaretVisibilityChecker} from "../../helpers/caret-visibility-checker/caret-visibility-checker.helper";
import {InputEventBusService} from "../input-event-bus/input-event-bus.service";
import {CharClickedEvent} from "../../models/events/io/char-clicked.event";

@Injectable()
export class CaretHandlerService {
  private overlayRef!:ElementRef

  constructor() {
    this.eventBus.on(CharClickedEvent).subscribe(event => this.move(event.charData))
  }

  public setInputOverlayRef(overlay:ElementRef){
    if(this.overlayRef)
      throw new Error("Overlay is already defined.")
    this.overlayRef=overlay
  }

  private readonly movementEmitter=new Subject<InputCharData>()

  private readonly indexService=inject(CaretIndexService)
  private readonly contextHandler=inject(ContextHandlerService)
  private readonly eventBus = inject(InputEventBusService)

  public handleKey(key:string, ctrlKey:boolean){
    if(ctrlKey)
      this.handleCtrlKey(key)
    else
      this.handleNormalKey(key)
  }

  private handleNormalKey(key: string) {
    switch (key) {
      case "ArrowLeft":
        return this.moveBackward();
      case "ArrowRight":
        return this.moveForward();
      case "Home":
        return this.moveToFirst();
      case "End":
        return this.moveToLast();
    }
  }

  private handleCtrlKey(key: string) {
    switch (key) {
      case 'ArrowLeft':
        return this.moveToPrevIrregular();
      case 'ArrowRight':
        return this.moveToNextIrregular();
      case 'Home':
        return this.moveToFirstInMain();
      case 'End':
        return this.moveToLastInMain();
    }
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
    this.makeCaretVisible(data.positionX)
  }

  public listenMoves(callback:(data:InputCharData)=>void){
    this.movementEmitter.subscribe(callback)
  }

  private makeCaretVisible(positionX:number){
    const overlay=this.overlayRef.nativeElement as HTMLElement
    const {clientWidth,scrollLeft}=overlay

    const visibilityChecker=new CaretVisibilityChecker(clientWidth,scrollLeft)
    const scrollToOptions=visibilityChecker.makeCharVisible(positionX)

    overlay.scrollTo(scrollToOptions)
    if(visibilityChecker.scrollNeedsAdjustment)
      setTimeout(()=>overlay.scrollBy({left:3}),100)
  }
}
