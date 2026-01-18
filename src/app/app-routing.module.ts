import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputTestingEnvironmentComponent } from './ui/features/input/tests/input-testing-environment/input-testing-environment.component';
import { HomeComponent } from './pages/home/home.component';
import { CalculatorsComponent } from './pages/calculators/calculators.component';
import { MathInputTestPageComponent } from './ui/features/math-input/test/math-input-test-page/math-input-test-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animations: 'home' },
  },
  {
    path: 'calculators',
    component: CalculatorsComponent,
    data: { animation: 'calculators' },
  },
  {
    path: 'input-testing',
    component: InputTestingEnvironmentComponent,
  },
  {
    path: 'math-input-test-page',
    component: MathInputTestPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
