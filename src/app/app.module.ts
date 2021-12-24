import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {AppRoutesModule} from "./app-routes.module";
import {RouterModule} from "@angular/router";
import {MainPageComponent} from "./layout/main/main-page.component";
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./shared/interceptors/auth.service";
import {NgxUiLoaderModule} from "ngx-ui-loader";
import {ngxUiLoaderConfig} from "./config";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }


//TODO: lazy loading???
//TODO: guards
//todo: tsconfig path
