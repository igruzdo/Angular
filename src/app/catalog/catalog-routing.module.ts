import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CatalogComponent} from "./catalog.component";
import {CatalogPageComponent} from "../catalog-page/catalog-page.component";

export const routes: Routes = [
  {
    path: '',
    component: CatalogPageComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CatalogRoutingModule { }
