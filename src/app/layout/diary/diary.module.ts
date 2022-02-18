import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiaryComponent} from './diary/diary.component';
import {Routes} from "@angular/router";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

const routes: Routes = [
  {
    path: ':id',
    component: DiaryComponent
  }
]


@NgModule({
  declarations: [
    DiaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class DiaryModule {
}
