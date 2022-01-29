import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuContainerDirective } from './directives/menu-container.directive';




@NgModule({
  declarations: [
    MenuComponent,
    MenuContainerDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MenuComponent
  ]
})
export class MenuModule { }
