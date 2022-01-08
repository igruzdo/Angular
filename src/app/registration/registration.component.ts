import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-registration',
  template: `
    <div class=popup-design>
      <div class=popup-content>
        <button class=popup-close (click)="closeModal()">&times;</button>
        <form #form="ngForm"
              (ngSubmit)="sendForm(form)"
              [ngFormOptions]="{updateOn: 'submit'}">
          <div class=form>
            <input type=text name=name placeholder="Ваше имя и фамилия"
                   ngModel
                   required
                   appNameMatch
                   #name="ngModel"
                   pattern="^[a-zA-Zа-яёА-ЯЁ ]+$">
            <div class="error" *ngIf="name.hasError('required')">Введите имя и фамилию</div>
            <div class="error" *ngIf="name.hasError('pattern')">Введите только буквы</div>
            <div class="error" *ngIf="name.hasError('nameMatch')">Введите не менее двух слов</div>
            <input type=text name=email placeholder="Ваш e-mail"
                   ngModel
                   required
                   email
                   #email="ngModel">
            <div class="error" *ngIf="email.hasError('required')">Введите адрес электронной почты</div>
            <div class="error" *ngIf="email.hasError('email')">Введите корректный адрес электронной почты</div>

            <ng-container ngModelGroup="password" #passwordGroup='ngModelGroup' appPasswordMatch>
              <input type=password name=password placeholder="Пароль"
                     ngModel
                     required
                     #password="ngModel"
                     pattern="(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}">
              <div class="error" *ngIf="password.hasError('required')">Введите пароль</div>
              <div class="error" *ngIf="password.hasError('pattern')">Пароль не удовлетворяет условиям</div>

              <input type=password name=confirm placeholder="Повторите пароль"
                     ngModel
                     required
                     #confirm="ngModel">
              <div class="error" *ngIf="passwordGroup.hasError('passwordMatch')">Введенные пароли не совпадают</div>
            </ng-container>
            <app-button text="Отправить" color="primary"></app-button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .error {
      text-align: start;
      color: red;
      font-family: Inter sans-serif;
      margin-top: -18px;
      margin-left: 20px;
      margin-bottom: 20px;
      width: 100%;
      font-size: 10px;
    }

    .popup-design {
      z-index: 20;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(197, 184, 211, 0.8);
    }

    .popup-design .form input {
      border: none;
      border-radius: 50px;
      background-color: #ffffff;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      width: 100%;
      color: inherit;
      resize: none;
    }


    .popup-content {
      position: fixed;
      text-align: center;
      width: 20rem;
      left: 50%;
      top: 20%;
      background-color: #ededed;
      border-radius: 4px;
      transform: translateX(-50%) !important;
      padding: 4rem 6rem 5rem 6rem;
    }

    .popup-close {
      position: absolute;
      top: -5rem;
      right: -1.5rem;
      font-size: 5rem;
      width: 5rem;
      height: 5rem;
      line-height: 4rem;
      text-align: center;
      background: transparent;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }
  `
  ]
})
export class RegistrationComponent implements OnInit {

  @Output() closed: EventEmitter<any> = new EventEmitter()

  closeModal() {
    this.closed.emit()
  }

  sendForm(form: NgForm) {
    if (!form.valid) {
      return
    }
    console.log(form)
  }


  constructor() {
  }

  ngOnInit(): void {
  }

}
