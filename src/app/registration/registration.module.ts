import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from './registration.component';
import {ButtonModule} from "../button/button.module";
import {FormsModule} from "@angular/forms";
import {PasswordMatchDirective} from "../checkout/directives/password-match.directive";
import {NameMatchDirective} from "../checkout/directives/name-match.directive";


@NgModule({
  declarations: [
    RegistrationComponent,
    PasswordMatchDirective,
    NameMatchDirective
  ],
  exports: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule
  ]
})
export class RegistrationModule {
}
