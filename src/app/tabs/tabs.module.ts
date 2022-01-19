import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabsBodyModule } from '../tabs-body/tabs-body.module';
import { TabsHeaderModule } from '../tabs-header/tabs-header.module';



@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    TabsBodyModule,
    TabsHeaderModule
  ],
  exports:[
    TabsComponent
  ]
})
export class TabsModule { }
