import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygameRoutingModule } from './playgame-routing.module';
import { PlaygameComponent } from './components/playgame/playgame.component';
import { FinalComponent } from './components/final/final.component';

@NgModule({
  declarations: [PlaygameComponent, FinalComponent],
  imports: [
    CommonModule,
    PlaygameRoutingModule
  ]
})
export class PlaygameModule { }
