import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasketComponent} from "./basket.component";
import {ButtonModule} from "../button/button.module";
import {ListModule} from "../list/list.module";
import {OrderconfirmModule} from "../orderconfirm/orderconfirm.module";
import { BasketEffects } from '../store/basket/effects/basket.effects';
import * as fromBasket from '../store/basket/reducers/basket.reduser'
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ListModule,
    OrderconfirmModule,
    StoreModule.forFeature('basket', fromBasket.reducer),
    EffectsModule.forFeature([BasketEffects])
  ],
  exports: [
    BasketComponent
  ]
})
export class BasketModule { }
