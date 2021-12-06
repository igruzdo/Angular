import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {items} from "../../data/product.data";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-catalog',
  template: `
    <app-basket [basketItems]="basket" [totalItems]="cartCount" [totalSum]="basketSum" (deletedIdItem)="deleteItem($event)" (cleared)="clearBasket()"></app-basket>
    <app-toggle [toggles]="toggle" (changed)="doCatalogFilter($event)" [value]="value"></app-toggle>
    <div class="card-items">
      <app-prod-card *ngFor="let item of productArr"
                     (selected)="select($event)"
                     [src] = "item.img"
                     [name] = "item.name"
                     [model] = "item.model"
                     [cost] = "item.cost"
                     [id]= "item.id"
      >
      </app-prod-card>
    </div>
  `,
  styles: [
    `.card-items {
      display: flex;
    }`
  ]
})
export class CatalogComponent implements OnInit {
  public productArr =  items;
  public value:string = '';
  public filter:string = '';

  @Output() selected = new EventEmitter();

  public cartCount:number = 0;
  public basketSum:number = 0;

  basket:any[] = [];


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

  doCatalogFilter(value:any){

    let itemValue:string =  value
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
    this.filter = this.rout.snapshot.queryParams['filter']
  }


  constructor(private router: Router, private rout: ActivatedRoute) {
    this.filter = this.rout.snapshot.queryParams['filter']
    this.doCatalogFilter(this.filter)
  }

  ngOnInit(): void {

  }

  ngOnChanges() {

  }
}
