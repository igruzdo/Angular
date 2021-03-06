import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import {ProdCardModule} from "../prod-card/prod-card.module";
import {ButtonModule} from "../button/button.module";
import {BasketModule} from "../basket/basket.module";
import {ToggleModule} from "../toggle/toggle.module";
import {CatalogRoutingModule} from "./catalog-routing.module";
import {CatalogPageModule} from "../catalog-page/catalog-page.module";
import {CatalogService} from "../services/catalog.service";
import {RegistrationModule} from "../registration/registration.module";
import { ClickAbroadDirective } from '../directives/click-abroad.directive';
import { FavoriteModule } from '../favorite/favorite.module';

@NgModule({
  declarations: [
    CatalogComponent,
    ClickAbroadDirective
  ],
  imports: [
    CommonModule,
    ProdCardModule,
    ButtonModule,
    BasketModule,
    ToggleModule,
    CatalogRoutingModule,
    CatalogPageModule,
    RegistrationModule,
    FavoriteModule
  ],
  exports: [
    CatalogComponent
  ],
  providers: [
    CatalogService
  ]
})
export class CatalogModule { }
