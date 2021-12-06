import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page.component';
import {ProdCardModule} from "../prod-card/prod-card.module";
import {ProductRoutingModule} from "./product-routing.module";



@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ProdCardModule,
    ProductRoutingModule,
  ],
  exports:[
    ProductPageComponent
  ]
})
export class ProductPageModule { }
