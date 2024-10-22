import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {LogoSectionComponent} from "./logo-section/logo-section.component";
import { IntroductionSectionComponent } from './introduction-section/introduction-section.component';
import { IntroductionPanelComponent } from './introduction-section/introduction-panel/introduction-panel.component';
import { ToolSectionComponent } from './tool-section/tool-section.component';
import { ToolPanelComponent } from './tool-section/tool-panel/tool-panel.component';
import { ToolPanelFeatureComponent } from './tool-section/tool-panel-feature/tool-panel-feature.component';
import { BackgroundAnimationComponent } from './background-animation/background-animation.component';
import {PageLocationService} from "./services/page-location/page-location.service";



@NgModule({
  declarations: [
    HomeComponent,
    LogoSectionComponent,
    IntroductionSectionComponent,
    IntroductionPanelComponent,
    ToolSectionComponent,
    ToolPanelComponent,
    ToolPanelFeatureComponent,
    BackgroundAnimationComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    PageLocationService
  ]
})
export class HomeModule { }
