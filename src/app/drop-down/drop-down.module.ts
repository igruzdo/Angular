import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropDownComponent} from "./drop-down.component";
import {ButtonModule} from "../button/button.module";


@NgModule({
  declarations: [DropDownComponent],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  exports: [
    DropDownComponent
  ]
})
export class DropDownModule { }
