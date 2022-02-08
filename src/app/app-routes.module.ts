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
    component: RegistrationComponent
  }
]

@NgModule({
  declarations: [
    AuthComponent,
    UserMenuComponent,
    RegistrationComponent],
  exports: [
    UserMenuComponent
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
  ]
})

export class AppRoutesModule {}
