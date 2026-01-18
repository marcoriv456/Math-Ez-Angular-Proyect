import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/organisms/header/header.component';
import { InputModule } from './ui/features/input/input.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './ui/organisms/footer/footer.component';
import { provideHttpClient } from '@angular/common/http';
import { HomeModule } from './pages/home/home.module';
import { CalculatorsModule } from './pages/calculators/calculators.module';
import { MathInputModule } from './ui/features/math-input/math-input.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    InputModule,
    BrowserAnimationsModule,
    HomeModule,
    CalculatorsModule,
    MathInputModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
