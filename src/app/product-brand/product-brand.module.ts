import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBrandComponent } from './product-brand.component';



@NgModule({
  declarations: [
    ProductBrandComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProductBrandComponent
  ]
})
export class ProductBrandModule { }
