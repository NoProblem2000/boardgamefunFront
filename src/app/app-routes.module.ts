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

const routes: Routes =[
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'authentication',
    component: AuthComponent
  }
]

@NgModule({
  declarations: [
    AuthComponent,
    UserMenuComponent],
  exports: [
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxUiLoaderModule,
    MatIconModule,
  ]
})

export class AppRoutesModule {}
