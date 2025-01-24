import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InputComponent } from './input/input.component';
import { InputTestingEnvironmentComponent } from './input/input-testing-environment/input-testing-environment.component';
import {InputModule} from "./input/input.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import {NgxParticlesModule} from "@tsparticles/angular";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InputModule,
        BrowserAnimationsModule,
        NgxParticlesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
