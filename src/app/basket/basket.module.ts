import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasketComponent} from "./basket.component";
import {ButtonModule} from "../button/button.module";
import {ListModule} from "../list/list.module";


@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ListModule
  ],
  exports: [
    BasketComponent
  ]
})
export class BasketModule { }
