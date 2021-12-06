import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-basket',
  template: `
    <div class="dropdown">
      <div class="count" *ngIf="totalItems">
        <p>{{totalItems}}</p>
      </div>
      <app-button color="default" size="default" (click)="isShowToggleClick()" text="Корзина"></app-button>
      <div *ngIf='isShow && totalItems' class="menu-wrapper">
        <button class="menu-wrapper-close" (click)="isShowToggleClick()">Закрыть</button>
        <app-list [data]="basketItems" (deleted)="deleteItemFromCart($event)"></app-list>
        <span>Сумма заказа: {{totalSum | currency: 'RUB':'symbol-narrow':'3.0': 'ru'}}</span>
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

  @Input() isShow = false;
  @Input() trigger = 'click';
  @Input() basketItems: any = [{model: 'default', count: 0}];
  @Input() totalItems: number = 0;
  @Input() totalSum:number = 0;

  @Output() deletedIdItem = new EventEmitter();
  @Output() cleared = new EventEmitter();

  constructor() {  }

  deleteItemFromCart(val:number){
    this.deletedIdItem.emit(val)
    if (this.totalItems == 1) {
      this.isShow = false;
    }
  }

  clearBasket() {
    this.cleared.emit()
    this.isShowToggleClick()
  }

  ngOnInit(): void {

  }
  isShowToggleClick() {
    if(this.trigger === 'click' && this.totalItems){
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
}
