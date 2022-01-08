import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderconfirmComponent} from './orderconfirm.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderconfirmComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderconfirmComponent
  ]
})
export class OrderconfirmModule {
}
