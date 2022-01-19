import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {DropDownModule} from "./drop-down/drop-down.module";
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundModule} from "./not-found/not-found.module";
import {CatalogPageModule} from "./catalog-page/catalog-page.module";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DropDownModule,
    AppRoutingModule,
    NotFoundModule,
    CatalogPageModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
