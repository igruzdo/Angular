import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {DropDownModule} from "./drop-down/drop-down.module";
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundModule} from "./not-found/not-found.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DropDownModule,
    AppRoutingModule,
    NotFoundModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
