import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import {ProdCardModule} from "../prod-card/prod-card.module";
import {ButtonModule} from "../button/button.module";
import {BasketModule} from "../basket/basket.module";
import {ToggleModule} from "../toggle/toggle.module";



@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    CommonModule,
    ProdCardModule,
    ButtonModule,
    BasketModule,
    ToggleModule
  ],
  exports: [
    CatalogComponent
  ]
})
export class CatalogModule { }
