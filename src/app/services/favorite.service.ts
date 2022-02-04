import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../types/data.types';

export interface FavoriteItem {
  product: Product
}

export interface FavoriteState {
  items: Array<FavoriteItem>
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  
  private _state: FavoriteState = {
    items: [] as Array<FavoriteItem>
  }

  get state() {
    return this._state.items
  }
  
  public state$:BehaviorSubject<FavoriteState> = new BehaviorSubject(this._state)

  public productsInFavorites$: Observable<Array<FavoriteItem>> = this.state$.pipe(
    map((state:FavoriteState) => state.items)
  )


  public productsCount$: Observable<number> = this.state$.pipe(
    map((state:FavoriteState) => state.items.length)
  )

  public addProduct(product: Product):void {
    this.createProduct(product)
  }

  public removeProduct(product: Product):void {
    this._state.items = this._state.items.filter((elem:FavoriteItem) => {
      return elem.product.id !== product.id
    })

    this.updateState()
    console.log(this._state.items)
  }

  protected updateState():void {
    this.state$.next({...this._state})
    // console.log(this.state$)
  }

  protected createProduct(product: Product):void {
    this._state = {
      ...this._state,
      items:[...this._state.items, {product}]
    }
    this.updateState()
    console.log(this._state.items)
  }

  constructor() { }
}
