import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CatalogComponent} from "./catalog/catalog.component";

export const routes: Routes = [
  {
    path: 'catalog',
    children: [
      {
        path: '',
        loadChildren: () => import("./catalog/catalog.module").then(m => m.CatalogModule)
      },
      {
        path: 'product/:id',
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
