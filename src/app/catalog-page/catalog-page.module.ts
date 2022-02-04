import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './catalog-page.component';
import { ProdCardModule } from "../prod-card/prod-card.module";
import { CatalogService } from "../services/catalog.service";
import { ButtonModule } from "../button/button.module";
import { ProductImgModule } from "../product-img/product-img.module";
import { ProductBrandModule } from '../product-brand/product-brand.module';
import { BageModule } from '../bage/bage.module';
import { ProductPriceModule } from '../product-price/product-price.module';
import { NgForObjectDirective } from '../directives/ng-for-object.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [
        CatalogPageComponent,
        NgForObjectDirective,
    ],
    exports: [
        CatalogPageComponent,
    ],
  imports: [
    CommonModule,
    ProdCardModule,
    ButtonModule,
    ProductImgModule,
    ProductBrandModule,
    BageModule,
    ProductPriceModule,
    FontAwesomeModule
  ],
  providers: [
    CatalogService
  ]
})
export class CatalogPageModule { }
