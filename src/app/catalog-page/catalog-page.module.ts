import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './catalog-page.component';
import {ProdCardModule} from "../prod-card/prod-card.module";
import {CatalogService} from "../services/catalog.service";


@NgModule({
    declarations: [
        CatalogPageComponent
    ],
    exports: [
        CatalogPageComponent,
    ],
    imports: [
        CommonModule,
        ProdCardModule
    ],
  providers: [
    CatalogService
  ]
})
export class CatalogPageModule { }
