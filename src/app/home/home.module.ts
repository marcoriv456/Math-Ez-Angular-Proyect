import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {LogoSectionComponent} from "./logo-section/logo-section.component";
import { IntroductionSectionComponent } from './introduction-section/introduction-section.component';
import { IntroductionPanelComponent } from './introduction-section/introduction-panel/introduction-panel.component';
import { ToolSectionComponent } from './tool-section/tool-section.component';
import { ToolPanelComponent } from './tool-section/tool-panel/tool-panel.component';



@NgModule({
  declarations: [
    HomeComponent,
    LogoSectionComponent,
    IntroductionSectionComponent,
    IntroductionPanelComponent,
    ToolSectionComponent,
    ToolPanelComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
