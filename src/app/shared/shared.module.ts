import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryCardsComponent } from './component/mat-cards/diary-cards/diary-cards.component'
import { ForumsCardsComponent } from './component/mat-cards/forums-cards/forums-cards.component';
import { UsersCardsComponent } from './component/mat-cards/users-cards/users-cards.component';
import { GamesCardsComponent } from './component/mat-cards/games-cards/games-cards.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    DiaryCardsComponent,
    ForumsCardsComponent,
    UsersCardsComponent,
    GamesCardsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FlexModule,
    RouterModule
  ],
  exports:[
    DiaryCardsComponent,
    ForumsCardsComponent,
    UsersCardsComponent,
    GamesCardsComponent
  ]
})
export class SharedModule { }
