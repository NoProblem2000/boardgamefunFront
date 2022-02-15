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
import { ForumsListComponent } from './component/list-view/forums-list/forums-list.component';



@NgModule({
  declarations: [
    DiaryCardsComponent,
    ForumsCardsComponent,
    UsersCardsComponent,
    GamesCardsComponent,
    ForumsListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FlexModule,
    RouterModule
  ],
  exports: [
    DiaryCardsComponent,
    ForumsCardsComponent,
    UsersCardsComponent,
    GamesCardsComponent,
    ForumsListComponent
  ]
})
export class SharedModule { }
