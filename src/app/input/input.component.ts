import {
  AfterViewChecked, ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject, QueryList,
  Renderer2, ViewChild, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {CharComponent, InputCharData} from "./char/char.component";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @HostBinding('tabindex')
  tabIndex=0
  @ViewChild('caret')
  caretRef!:ElementRef
  @ViewChildren(CharComponent)
  renderedChars!:QueryList<CharComponent>

  renderer=inject(Renderer2)
  chars:string[]=[]
  caretPosition=0
  caretIndex=0

  @HostListener('keydown',['$event'])
  onKeyDown(event:KeyboardEvent){
    event.preventDefault()
    let {key}=event
    if(key.length==1)
      this.appendChar(event.key)
    else if(key=='Backspace')
      this.deleteChar()

  }

  appendChar(char:string) {
    this.chars.push(char)
  }

  moveCaretTo({position,index}:InputCharData){
    this.renderer.setStyle(this.caretRef.nativeElement,'left',position+'px')
    this.caretIndex=index
  }
  deleteChar(){
    let prevRenderedChar=this.renderedChars.get(this.caretIndex-1)
    this.chars.splice(this.caretIndex,1)

    let data:InputCharData= prevRenderedChar ?
      prevRenderedChar.data : {position:0, index:0};
    this.moveCaretTo(data)
  }


}
