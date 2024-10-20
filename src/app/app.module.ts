import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LogoSectionComponent } from './home/logo-section/logo-section.component';
import {HomeModule} from "./home/home.module";
import { HeaderNavComponent } from './header/header-nav/header-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
