import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdCardComponent } from "./prod-card.component";
import { BageModule } from "../bage/bage.module";
import { RatingModule } from "../rating/rating.module";
import { ButtonModule } from "../button/button.module";


@NgModule({
  declarations: [
    ProdCardComponent
  ],
  imports: [
    CommonModule,
    BageModule,
    RatingModule,
    ButtonModule
  ],
  exports: [
    ProdCardComponent
  ]
})
export class ProdCardModule { }
