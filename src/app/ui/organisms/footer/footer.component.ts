import {AfterViewInit, Component, ElementRef, inject} from '@angular/core';
import {FooterObserverService} from "../../../core/services/footer/footer-observer.service";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {GithubService} from "../../../core/services/github/github.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit{
  private ref=inject(ElementRef).nativeElement as HTMLElement
  private footerService=inject(FooterObserverService)
  private observer=new IntersectionObserver((entries)=>{
    let self=entries[0]
    if(self.isIntersecting)
      this.footerService.emit('enter')
    else
      this.footerService.emit('exit')
  },{threshold:0.7})

  protected gitHubProfileData={img:'',name:'',username:''}
  private gitHubService=inject(GithubService)

  ngAfterViewInit() {
    this.observer.observe(this.ref)
    this.setGithubProfilePic()
  }

  private async setGithubProfilePic(){
    this.gitHubProfileData= await this.gitHubService.getGithubProfileData()
  }


}
