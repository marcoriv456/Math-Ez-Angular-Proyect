import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InputComponent} from "./ui/features/input/input.component";
import {InputTestingEnvironmentComponent} from "./ui/features/input/tests/input-testing-environment/input-testing-environment.component";
import {HomeComponent} from "./ui/pages/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'input-testing',
    component:InputTestingEnvironmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
