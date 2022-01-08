import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasketComponent} from "./basket.component";
import {ButtonModule} from "../button/button.module";
import {ListModule} from "../list/list.module";
import {OrderconfirmModule} from "../orderconfirm/orderconfirm.module";


@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ListModule,
    OrderconfirmModule
  ],
  exports: [
    BasketComponent
  ]
})
export class BasketModule { }
