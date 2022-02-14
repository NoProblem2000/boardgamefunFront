import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./layout/main/main-page.component";
import { AuthComponent } from './layout/auth/auth.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {NgxUiLoaderModule} from "ngx-ui-loader";
import { UserMenuComponent } from './layout/header/user-menu/user-menu.component';
import {MatIconModule} from "@angular/material/icon";
import { RegistrationComponent } from './layout/registration/registration.component';
import {MaterialFileInputModule} from "ngx-material-file-input";
import {SaveDataGuard} from "./shared/guards/save-data.guard";
import { GamesCardsComponent } from './shared/component/mat-cards/games-cards/games-cards.component';
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import { DiaryCardsComponent } from './shared/component/mat-cards/diary-cards/diary-cards.component';
import { ForumsCardsComponent } from './shared/component/mat-cards/forums-cards/forums-cards.component';
import { UsersCardsComponent } from './shared/component/mat-cards/users-cards/users-cards.component';

const routes: Routes =[
  {
    path: 'error',
    loadChildren: () => import ('./error-pages/error-page.module').then(module => module.ErrorPageModule)
  },
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'authentication',
    component: AuthComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canDeactivate: [SaveDataGuard]
  },
  {
    path: 'game',
    loadChildren: () => import('./layout/game/game.module').then(module => module.GameModule)
  }
]

@NgModule({
  declarations: [
    AuthComponent,
    UserMenuComponent,
    RegistrationComponent,
    GamesCardsComponent,
    DiaryCardsComponent,
    ForumsCardsComponent,
    UsersCardsComponent],
  exports: [
    UserMenuComponent,
    GamesCardsComponent,
    DiaryCardsComponent,
    ForumsCardsComponent,
    UsersCardsComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatButtonModule,
    NgxUiLoaderModule,
    MatIconModule,
    MaterialFileInputModule,
    MatCardModule,
    FlexModule,
  ],
  providers:[SaveDataGuard]
})

export class AppRoutesModule {}
