import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {items} from "../../data/product.data";

@Injectable()

export class CatalogService {

  public productsFromDataService:any[] = this.service.getData();

  getProducts(filterBy:string = 'default') {
   let products = []

    switch (filterBy){
      case "available":
        this.productsFromDataService.forEach(item => {
          if(item["available"]){
            products.push(item)
          }
        })
        break;
      case "discount":
        this.productsFromDataService.forEach(item => {
          if(item["discount"]){
            products.push(item)
          }
        })
        break;
      case "default":
        products = this.productsFromDataService;
        break;
    }
    return products;
  }

  getProduct(id: number) {
    let itemById:any;
    this.productsFromDataService.forEach(item => {
      if(item.id == id) {
        itemById =  item;
      }
    })
    return itemById;
  }

  constructor(public service: DataService) { }
}
