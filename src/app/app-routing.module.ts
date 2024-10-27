import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {InputComponent} from "./input/input.component";
import {InputTestingEnvironmentComponent} from "./input/input-testing-environment/input-testing-environment.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },{
    path:'input-testing',
    component:InputTestingEnvironmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
