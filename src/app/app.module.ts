import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/organisms/header/header.component';
import {InputModule} from "./ui/features/input/input.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FooterComponent } from './ui/organisms/footer/footer.component';
import {provideHttpClient} from "@angular/common/http";
import {HomeModule} from "./ui/pages/home/home.module";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InputModule,
        BrowserAnimationsModule,
        HomeModule
    ],
    providers: [
      provideHttpClient()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
