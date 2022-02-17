import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum/forum.component';
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { NewForumTopicComponent } from './new-forum-topic/new-forum-topic.component';

const routes: Routes =[
  {
    path: 'create-topic/:gameId',
    component: NewForumTopicComponent
  },
  {
    path: ':id',
    component: ForumComponent
  }
]

@NgModule({
  declarations: [
    ForumComponent,
    NewForumTopicComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class ForumModule { }
