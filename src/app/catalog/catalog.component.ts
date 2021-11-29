import {Component, OnInit, OnChanges, Input} from '@angular/core';
import { items } from "../../data/product.data";

@Component({
  selector: 'app-catalog',
  template: `
    <app-basket [basketItems]="basket" [totalItems]="cartCount" [totalSum]="basketSum" (deletedIdItem)="deleteItem($event)" (cleared)="clearBasket()"></app-basket>
    <div class="card-items">
      <div *ngFor="let item of productArr">
        <app-prod-card
                        (selected)="select($event)"
                       [src] = "item.img"
                       [name] = "item.name"
                       [model] = "item.model"
                       [cost] = "item.cost"
                       [id]= "item.id"
                       >
        </app-prod-card>
      </div>
    </div>
    <app-toggle [toggles]="toggle" (changed)="doCatalogFilter($event)" [value]="value"></app-toggle>
  `,
  styles: [
    `.card-items {
        display: flex;
    }`
  ]
})
export class CatalogComponent implements OnInit {

  value:string = '';

  public productArr =  items;
  public cartCount:number = 0;
  public basketSum:number = 0;

  basket:any[] = [];

  toggle:any[] = [
    {
      value: 'default',
      label: 'Показать все'
    },
    {
      value: 'available',
      label: 'В наличии'
    },
    {
      value: 'discount',
      label: 'Со скидкой'
    }
    ]

  // changeColor(selector:string){
  //   document.querySelector()
  // }

  clearBasket(){
    this.basket = [];
    this.getCount()
    this.getTotalSum()
  }

  deleteItem(val:number){
    this.basket.forEach((item, index) => {
      if (item.id === val) {
        item.count--
        this.cartCount--
      }
      if (item.count === 0) {
        this.basket.splice(index, 1)
      }
    })
    this.getTotalSum()
  }

  doCatalogFilter(value:any){
    let itemValue:string = value.target.value
    switch (itemValue){
      case "available":
        this.productArr = []
        items.forEach(item => {
          if(item["available"]){
            this.productArr.push(item)
          }
        })
        this.value = itemValue
        break;
      case "discount":
        this.productArr = []
        items.forEach(item => {
          if(item["discount"]){
            this.productArr.push(item)
          }
        })
        this.value = itemValue
        break;
      case "default":
        this.productArr = items;
        this.value = itemValue
        break;
    }
  }

  getCount() {
    this.cartCount = 0;
    this.basket.forEach(item => {
      this.cartCount += item.count
    })
  }

  getTotalSum() {
    this.basketSum = 0;
    this.basket.forEach(item => {
      this.basketSum += item.count*item.cost
    })
  }

  select(val:any) {
    let check:number = 0;
    for (let i = 0; i < this.basket.length; i++){
      if(this.basket[i].model == val.model) {
        check++
      }
    }
    if(check > 0) {
      for(let i = 0; i < this.basket.length; i++) {
        if(this.basket[i].model == val.model) {
          this.basket[i].count++
        }
      }
    } else {
      this.basket.push(val)
    }
    this.getCount()
    this.getTotalSum()
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {

  }
}
