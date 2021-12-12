import {Component, HostListener, Input, OnInit} from '@angular/core';
import {BasketService} from "../services/basket.service";

@Component({
  selector: 'app-basket',
  template: `
    <div class="dropdown">
      <div class="count" *ngIf="service.cartCount">
        <p>{{service.cartCount}}</p>
      </div>
      <app-button color="default" size="default" (click)="isShowToggleClick()" text="Корзина"></app-button>
      <div *ngIf='isShow && service.cartCount' class="menu-wrapper">
        <button class="menu-wrapper-close" (click)="isShowToggleClick()">Закрыть</button>
        <app-list [data]="service.basket" (deleted)="deleteItemFromCart($event)"></app-list>
        <span>Сумма заказа: {{service.basketSum | currency: 'RUB':'symbol-narrow':'3.0': 'ru'}}</span>
        <div class="menu-wrapper-btns">
          <button class="menu-wrapper-clear" (click)="clearBasket()">Очистить</button>
          <button class="menu-wrapper-order" (click)="clearBasket()">Оформить заказ</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dropdown {
        position: relative;
        display: inline-block;
      }

      .menu-wrapper {
        position: absolute;
        margin-top: 1px;
        padding: 8px;
        border-radius: 10px;
        border: 1px solid #EEEEEE;
        box-sizing: border-box;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 6px 8px rgba(0, 0, 0, 0.08);
        background-color: white;
        z-index: 1000;
      &-btns{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
       }

      &-close {
        height: 20px;
        border-radius: 10px;
        border: 2px solid rgba(59, 101, 255, .1);
        background-color: #ff7a7a;
        font-family: Inter;
        font-size: 14px;
        cursor: pointer;
        color: black;
      }

      &-clear {
        height: 20px;
        border-radius: 10px;
        border: 2px solid rgba(59, 101, 255, .1);
        background-color: #d19bf1;
        font-family: Inter;
        font-size: 14px;
        cursor: pointer;
        color: black;
      }

      &-order {
        height: 20px;
        border-radius: 10px;
        border: 2px solid rgba(59, 101, 255, .1);
        font-family: Inter;
        font-size: 14px;
        cursor: pointer;
        color: black;
      }

      }
      .count {
        position: absolute;
        left: 80%;
        top: 15%;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }`
  ]
})
export class BasketComponent implements OnInit {

  isShow = false;
  @Input() trigger = 'click';

  deleteItemFromCart(val:number){
    this.service.removeProduct(val)
    if (this.service.cartCount == 0) {
      this.isShow = false;
    }
  }

  clearBasket() {
    this.service.clearBasket()
    this.isShow = false;
  }

  isShowToggleClick() {
    if(this.trigger === 'click' && this.service.cartCount){
      this.isShow = !this.isShow;
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.trigger === 'hover') {
      this.isShow = true;
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.trigger === 'hover') {
      this.isShow = false;
    }
  }

  constructor(public service: BasketService) {
  }

  ngOnInit(): void {
  }
}
