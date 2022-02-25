import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BasketItem {
  id: number,
  cost: number,
  model: string,
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public basket:BasketItem[] = [];
  public cartCount = 0;
  public basketSum = 0;

  public addProduct(product:BasketItem) {
    let check:number = 0;
    
    for (let i = 0; i < this.basket.length; i++){
      if(this.basket[i].model == product.model) {
        check++
      }
    }
    if(check > 0) {
      for(let i = 0; i < this.basket.length; i++) {
        if(this.basket[i].model == product.model) {
          let copyBasket = JSON.parse(JSON.stringify(this.basket))
          copyBasket[i].count++
          this.basket = [...copyBasket]
        }
      }
    } else {
      let copyBasket = JSON.parse(JSON.stringify(this.basket))
      copyBasket.push(product)
      this.basket = [...copyBasket]
    }
    this.getCount()
    this.getTotalSum()
    this.toLocalStorage()
  }

  public removeProduct(id:number) {
    for(let i = 0; i < this.basket.length; i++) {
      if (this.basket[i].id === id) {
        let copyBasket = JSON.parse(JSON.stringify(this.basket))
        copyBasket[i].count--
        if(copyBasket[i].count === 0) {
          copyBasket = copyBasket.splice(i-1, 1)
        }
        this.basket = [...copyBasket]
      }
    }
    this.getCount()
    this.getTotalSum()
    this.toLocalStorage()
  }

  public createCart(items:any) {
    console.log(items)
    this.basket.push(...items)
    console.log(this.basket)
    this.getCount()
    this.getTotalSum()
  }

  private  getCount() {
    this.cartCount = 0;
    this.basket.forEach(item => {
      this.cartCount += item.count
    })
  }

  private  getTotalSum() {
    this.basketSum = 0;
    this.basket.forEach(item => {
      this.basketSum += item.count*item.cost
    })
  }

  public clearBasket() {
    this.basket = [];
    localStorage.removeItem('basket')
    this.getCount()
    this.getTotalSum()
  }

  private toLocalStorage() {
    localStorage.setItem('basket', JSON.stringify(this.basket))
  }

  public initBasket() {
    this.basket = JSON.parse(localStorage['basket'])
    this.getCount()
    this.getTotalSum()
}

  constructor() { }
}
