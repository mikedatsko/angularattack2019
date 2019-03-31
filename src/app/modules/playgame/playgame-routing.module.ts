import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygameComponent } from './components/playgame/playgame.component';
import { FinalComponent } from './components/final/final.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlaygameComponent
  },
  {
    path: 'final/:lives',
    component: FinalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygameRoutingModule { }
