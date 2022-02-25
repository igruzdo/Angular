import { Injectable, OnInit } from '@angular/core';
import {DataService} from "./data.service";
import {HttpService} from "./http.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../types/data.types";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

export interface CatalogResponse {
  meta: {[key:string]: number},
  items: Array<Product>
}

export interface Request {
  requestUrl:string,
  products:CatalogResponse
}

@Injectable()
export class CatalogService implements OnInit {


  private queryParams:{[key:string]: string} = {}
  private urlForProducts = 'https://localhost:3000/api/products/';
  private urlForOneProduct!:string;
  private params!:HttpParams 

  public products$!:Observable<any>
  public product$!:Observable<any>

  public cash:{[key:string]:any}[] = []

  public subjectProducts$:BehaviorSubject<any> = new BehaviorSubject<any>(0)
  public subjectProduct$:BehaviorSubject<any> = new BehaviorSubject<any>(0)

  public getProduct() {
    this.urlForOneProduct = `https://localhost:3000/api/products/${this.queryParams['id']}`
    this.product$ = this.httpService.get<Array<Product>>(this.urlForOneProduct)
    this.product$.subscribe(val => this.subjectProduct$.next(val))
  }

  public getProducts() {
    const url = window.location.href

    if(this.cash.some((item) => item['url'] == url && item['response'] != 0)) {
      let findItem = this.cash.find(item => item['url'] == url)

      if(findItem) {
        let result = findItem['response']
        this.subjectProducts$.next(result) 
      }

      console.log(this.cash)
      console.log('from cash')
    } else {
      this.products$ = this.httpService.get<Array<Product>>(this.urlForProducts, this.params)

      if(this.subjectProducts$.getValue() != 0) {
        this.cash.push({
          url:window.location.href,
          response: this.subjectProducts$.getValue()
        })
      }

      this.products$.forEach(val => {
        this.subjectProducts$.next(val) 
      })
      console.log('from api')
    }
  }

  constructor(public service: DataService, private httpService: HttpService, public route: ActivatedRoute) { 
    route.queryParams.subscribe(param => {
      this.queryParams = {
        ...this.queryParams,
        ...param
      }

      this.params = new HttpParams({fromObject: this.queryParams})

      if(this.queryParams['id']) {
        this.getProduct()
      }
      this.getProducts()

    })  
  }
  ngOnInit() {

  }
}
