import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameComponent} from './game/game.component';
import {GameEditingComponent} from './game-editing/game-editing.component';
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {SaveDataGuard} from "../../shared/guards/save-data.guard";

const routes: Routes = [
  {
    path: 'edit/:id',
    component: GameEditingComponent
  },
  {
    path: 'edit',
    component: GameEditingComponent,
    canDeactivate: [SaveDataGuard]
  },
  {
    path: ':id',
    component: GameComponent
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
    MatTabsModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class GameModule {
}
