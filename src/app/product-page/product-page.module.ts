import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page.component';
import {ProdCardModule} from "../prod-card/prod-card.module";
import {ProductRoutingModule} from "./product-routing.module";
import { ProductImgModule } from "../product-img/product-img.module";
import { ProductBrandModule } from '../product-brand/product-brand.module';
import { BageModule } from '../bage/bage.module';
import { ProductPriceModule } from '../product-price/product-price.module';
import { ButtonModule } from "../button/button.module";
import { TabsModule } from '../tabs/tabs.module';
import { TabsBodyModule } from '../tabs-body/tabs-body.module';
import { TabsHeaderModule } from '../tabs-header/tabs-header.module';



@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ProdCardModule,
    ProductRoutingModule,
    ProductImgModule,
    ProductBrandModule,
    BageModule,
    ProductPriceModule,
    ButtonModule,
    TabsModule,
    TabsBodyModule,
    TabsHeaderModule
  ],
  exports:[
    ProductPageComponent
  ]
})
export class ProductPageModule { }
