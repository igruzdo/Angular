import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsHeaderComponent } from './tabs-header.component';



@NgModule({
  declarations: [
    TabsHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TabsHeaderComponent
  ]
})
export class TabsHeaderModule { }
