import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { GoalsComponent } from './goals/goals.component';
import { DietComponent } from './diet/diet.component';
import { ActivityComponent } from './activity/activity.component';
import { ResultsComponent } from './results/results.component';
import { ProtienCalculatorComponent } from './protien-calculator/protien-calculator/protien-calculator.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalDetailsComponent
  },
  {
    path: 'personalDetails',
    component: PersonalDetailsComponent
  },
  {
    path: 'goals',
    component: GoalsComponent
  },
  {
    path: 'diet',
    component: DietComponent
  },
  {
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'protienCalculator',
    component: ProtienCalculatorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
