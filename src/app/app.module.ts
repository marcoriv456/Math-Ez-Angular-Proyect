import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LogoSectionComponent } from './home/logo-section/logo-section.component';
import {HomeModule} from "./home/home.module";
import { FooterComponent } from './footer/footer.component';
import { InputComponent } from './input/input.component';
import { InputTestingEnvironmentComponent } from './input/input-testing-environment/input-testing-environment.component';
import {InputModule} from "./input/input.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomeModule,
        InputModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
