import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  InputTestingEnvironmentComponent
} from "./ui/features/input/tests/input-testing-environment/input-testing-environment.component";
import {HomeComponent} from "./pages/home/home.component";
import {CalculatorsComponent} from "./pages/calculators/calculators.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'calculators',
    component: CalculatorsComponent
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
