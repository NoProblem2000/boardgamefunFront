import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ServerComponent } from './server/server.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterModule, Routes} from "@angular/router";
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    data: {title: 'Недостаточно прав для просмотра ресурсов'}
  },
  {
    path: 'server-error',
    component: ServerComponent,
    data: {title: 'Ошибка сервера'}
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {title: 'Ресурс не найден'}
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: {title: 'Вы не авторизованы'}
  }
];

@NgModule({
  declarations: [
    ForbiddenComponent,
    ServerComponent,
    NotFoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ], exports:[ForbiddenComponent, ServerComponent, NotFoundComponent]
})
export class ErrorPageModule { }
