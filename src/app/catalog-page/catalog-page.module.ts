import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './catalog-page.component';
import {ProdCardModule} from "../prod-card/prod-card.module";
import {CatalogService} from "../services/catalog.service";
import {ButtonModule} from "../button/button.module";


@NgModule({
    declarations: [
        CatalogPageComponent
    ],
    exports: [
        CatalogPageComponent,
    ],
  imports: [
    CommonModule,
    ProdCardModule,
    ButtonModule
  ],
  providers: [
    CatalogService
  ]
})
export class CatalogPageModule { }
