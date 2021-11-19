import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconTooltipComponent } from './icon-tooltip.component';
import {IconModule} from "../icon/icon.module";
import {TooltipModule} from "../tooltip/tooltip.module";



@NgModule({
  declarations: [
    IconTooltipComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    TooltipModule
  ],
  exports: [
    IconTooltipComponent
  ]
})
export class IconTooltipModule { }
