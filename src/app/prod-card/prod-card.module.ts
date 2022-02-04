import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdCardComponent } from "./prod-card.component";
import { BageModule } from "../bage/bage.module";
import { ButtonModule } from "../button/button.module";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ProdCardComponent
  ],
  imports: [
    CommonModule,
    BageModule,
    ButtonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    ProdCardComponent
  ]
})
export class ProdCardModule { }
