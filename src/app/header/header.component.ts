import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly colors= {
    'none':'#4E80FF',
    'home': '#4E80FF',
    'lineal-algebra': '#FF9334',
    'calculus': '#FF3434',
    'logic': '#34FF3A',
    'graphics': '#34D6FF',
    'color': '#3466FF',
    'statistics': '#9747FF',
  }
  backgroundColor=this.colors['none'];
  changeBackgroundColor(color: string) {
    //@ts-ignore
    this.backgroundColor=this.colors[color]
  }
}
