import {TabScrollingService} from "../services/tab-scrolling/tab-scrolling.service";


export abstract class AnimatedTabAccessibleElement {
  protected abstract tabScrollingService:TabScrollingService;
  protected onFocus(){
    this.tabScrollingService.moveScrollTo(this.getParentSection())
  }

  protected abstract getParentSection():HTMLElement
}
