import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { InputModule } from '../../ui/features/input/input.module';
import { SharedModule } from '../../ui/shared/shared.module';
import { IntroductionComponent } from './ui/sections/introduction/introduction.component';
import { TopicsComponent } from './ui/sections/topics/topics.component';
import { TopicButtonComponent } from './ui/atoms/topic-button/topic-button.component';
import { RegisterComponent } from './ui/sections/register/register.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    IntroductionComponent,
    TopicsComponent,
    TopicButtonComponent,
    RegisterComponent,
  ],
  imports: [CommonModule, InputModule, SharedModule, RouterLink],
  exports: [HomeComponent],
})
export class HomeModule {}
