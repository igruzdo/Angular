import { Injectable } from '@angular/core';
import {items} from "../../data/product.data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data:any;

  setData<T>(data:T) {
    this.data = data
  }

  getData<T>() {
    return this.data
  }

  constructor() {
    this.setData(items)
  }
}
