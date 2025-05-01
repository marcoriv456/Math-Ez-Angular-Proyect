import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { InputTestingEnvironmentComponent } from './input/input-testing-environment/input-testing-environment.component';
import {InputModule} from "./input/input.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './ui/pages/home/home.component';
import {NgxParticlesModule} from "@tsparticles/angular";
import { FooterComponent } from './footer/footer.component';
import {provideHttpClient} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InputModule,
        BrowserAnimationsModule,
        NgxParticlesModule,
    ],
    providers: [
      provideHttpClient()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
