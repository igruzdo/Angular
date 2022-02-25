import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BasketService} from "../services/basket.service";
import {NameMatchValidator} from "../validators/nameMatch.validator";

@Component({
  selector: 'app-orderconfirm',
  template: `
    <div class="row">
      <div class="col-75">
        <div class="container">
          <form [formGroup]="checkoutForm" (ngSubmit)="sendForm()">
            <div class="row">
              <div class="col-50">
                <h3>Оформление заказа</h3>
                <button class=popup-close (click)="closePopup()">&times;</button>

                <label for="fname"><i class="fa fa-user"></i>Фамилия и имя</label>
                <input type="text" id="fname" name="firstname" placeholder="Иванов Иван" formControlName="name">
                <p style="color: red; margin-top: -15px" *ngIf="checkoutForm.get('name')?.hasError('required')">введите
                  имя и фамилию</p>
                <p style="color: red; margin-top: -15px" *ngIf="checkoutForm.get('name')?.hasError('nameMatch')">введите
                  минимум 2 слова</p>
                <p style="color: red; margin-top: -15px" *ngIf="checkoutForm.get('name')?.hasError('pattern')">введите
                  только буквы</p>

                <label for="phone"><i class="fa fa-envelope"></i>Телефон</label>
                <input type="text" id="phone" name="phone" placeholder="+78953651232" formControlName="phone">
                <p style="color: red; margin-top: 0px" *ngIf="checkoutForm.get('phone')?.hasError('minlength')">длина
                  телефона не менее 12 символов</p>
                <p style="color: red; margin-top: -15px" *ngIf="checkoutForm.get('phone')?.hasError('required')">введите
                  номер телефона</p>
                <p style="color: red; margin-top: -15px" *ngIf="checkoutForm.get('phone')?.hasError('pattern')">
                  разрешается вводить только числа и "+"</p>

                <label for="pickupOwn"><i class="fa fa-envelope"></i>Выберите способ доставки</label>
                <select id="pickupOwn" formControlName="pickupOwn">
                  <option>Самовывоз</option>
                  <option>Доставка</option>
                </select>
                <p style="color: red" *ngIf="checkoutForm.get('pickupOwn')?.hasError('required')">выберите один из
                  вариантов</p>

                <ng-container formGroupName="address" *ngIf="checkoutForm.get('pickupOwn')?.value =='Доставка'">
                  <label style="margin-top: 10px" for="adr"><i class="fa fa-address-card-o"></i>Адрес доставки</label>
                  <input type="text" id="adr" name="address" placeholder="Ленина 41"
                         formControlName="street">

                  <label for="city"><i class="fa fa-institution"></i>Город доставки</label>
                  <input type="text" id="city" name="city" placeholder="Волгоград">
                </ng-container>
                <p>Выберите способ оплаты</p>
                <select id="payway" formControlName="payway">
                  <option *ngIf="checkoutForm.get('pickupOwn')?.value !='Доставка'">Оплата наличными</option>
                  <option>Оплата банковской картой</option>
                  <option>Оплата онлайн</option>
                </select>
              </div>
            </div>
            <input type="submit" value="Оформить заказ" class="btn">
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .popup-close {
      position: absolute;
      top: -1rem;
      right: -1rem;
      font-size: 2rem;
      width: 5rem;
      height: 5rem;
      line-height: 4rem;
      text-align: center;
      background: transparent;
      color: #000000;
      border: none;
      cursor: pointer;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -16px;
    }

    .col-50 {
      flex: 50%;
    }

    .col-75 {
      flex: 75%;
    }

    .col-50,
    .col-75 {
      padding: 0 16px;
    }

    .container {
      background-color: #f2f2f2;
      padding: 5px 20px 15px 20px;
      border: 1px solid lightgrey;
      border-radius: 3px;
    }

    input[type=text] {
      width: 90%;
      margin-bottom: 20px;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }

    label {
      margin-bottom: 10px;
      display: block;
    }

    .btn {
      background-color: #4CAF50;
      color: white;
      padding: 12px;
      margin: 10px 0;
      border: none;
      width: 100%;
      border-radius: 3px;
      cursor: pointer;
      font-size: 17px;
    }

    .btn:hover {
      background-color: #45a049;
    }
  `
  ]
})
export class OrderconfirmComponent implements OnInit {
  @Output() closed: EventEmitter<any> = new EventEmitter;

  @Input() set previousValue(val: any) {
    this.newValue = JSON.parse(JSON.stringify(val))
    console.log(this.newValue)
    this.checkoutForm.controls['name']?.setValue(this.newValue.name)
    this.checkoutForm.controls['phone']?.setValue(this.newValue.phone)
    this.checkoutForm.controls['pickupOwn']?.setValue(this.newValue.pickupOwn)
    this.checkoutForm.controls['address']?.setValue(this.newValue.address)
  }

  public newValue: any = {
    name: '',
    phone: '',
    pickupOwn: '',
    address: {
      street: '',
      city: ''
    },
    payway: ''
  }

  public checkoutForm: FormGroup = this.fb.group({
    name: [this.newValue.name, [
      Validators.required, NameMatchValidator,
      Validators.pattern('^[a-zA-Zа-яёА-ЯЁ ]+$')
    ]],
    phone: [this.newValue.phone, [
      Validators.required, Validators.minLength(12),
      Validators.pattern('^(\\+)?((\\d{2,3}) ?\\d|\\d)(([ -]?\\d)|( ?(\\d{2,3}) ?)){5,12}\\d$')
    ]],
    pickupOwn: [this.newValue.pickupOwn,
      Validators.required
    ],
    address: this.fb.group({
      street: [this.newValue.address.street],
      city: [this.newValue.address.city]
    }),
    payway: [this.newValue.payway, Validators.required]
  })

  closePopup() {
    this.closed.emit(false)
    localStorage.setItem('lastData', JSON.stringify(this.checkoutForm.value))
  }

  sendForm() {
    if (this.checkoutForm.get('pickupOwn')?.value === 'Самовывоз') {
      this.checkoutForm.get('street')?.setErrors(null)
      this.checkoutForm.get('city')?.setErrors(null)
    }
    if (!this.checkoutForm.valid) {
      return
    }
    console.log(this.checkoutForm)
    localStorage.removeItem('lastData')
    this.service.clearBasket()
    this.closed.emit(false)
  }

  constructor(private fb: FormBuilder, public service: BasketService) {
  }

  ngOnInit(): void {

  }
}
