import {AfterViewInit, Component, inject} from '@angular/core';
import {HomeService} from "./services/home-service/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  homeService=inject(HomeService)
  ngAfterViewInit() {
    this.homeService.homeInitialized.emit()
  }
}
