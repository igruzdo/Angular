import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ProdCardModule} from "./prod-card/prod-card.module";
import {DropDownModule} from "./drop-down/drop-down.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
