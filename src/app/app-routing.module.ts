import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExtraOptions, RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CatalogPageComponent} from "./catalog-page/catalog-page.component";
import {CatalogComponent} from "./catalog/catalog.component";

export const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./catalog/catalog.module").then(m => m.CatalogModule)
      },
      {
        path: 'product',
        loadChildren: () => import("./product-page/product-page.module").then(m => m.ProductPageModule)
      }
    ]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

export const options: ExtraOptions = {
  enableTracing: true
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
