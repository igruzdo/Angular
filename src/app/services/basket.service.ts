import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public basket:any[] = [];
  public cartCount = 0;
  public basketSum = 0;

  addProduct(product:any) {
    let check:number = 0;
    for (let i = 0; i < this.basket.length; i++){
      if(this.basket[i].model == product.model) {
        check++
      }
    }
    if(check > 0) {
      for(let i = 0; i < this.basket.length; i++) {
        if(this.basket[i].model == product.model) {
          this.basket[i].count++
        }
      }
    } else {
      this.basket.push(product)
    }
    this.getCount()
    this.getTotalSum()
  }

  removeProduct(id:number){
    this.basket.forEach((item, index) => {
      if (item.id === id) {
        item.count--
      }
      if (item.count === 0) {
        this.basket.splice(index, 1)
      }
    })
    this.getCount()
    this.getTotalSum()
  }

  getCart() {
    return this.basket;
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

  clearBasket() {
    this.basket = [];
    this.getCount()
    this.getTotalSum()
  }

  constructor() { }
}
