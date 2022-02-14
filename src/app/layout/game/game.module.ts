import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GameEditingComponent } from './game-editing/game-editing.component';
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";

const routes: Routes = [
  {
    path: ':id',
    component: GameComponent
  },
  {
    path: 'edit/:id',
    component: GameEditingComponent
  }
]

@NgModule({
  declarations: [
    GameComponent,
    GameEditingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule
  ]
})
export class GameModule { }
