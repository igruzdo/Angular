import { Injectable, OnInit } from '@angular/core';
import {DataService} from "./data.service";
import {HttpService} from "./http.service";
import {Observable, ReplaySubject, shareReplay, Subject, take, tap} from "rxjs";
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

  public subjectProducts$:Subject<any> = new Subject<any>()
  public subjectProduct$:Subject<any> = new Subject<any>()

  constructor(public service: DataService, private httpService: HttpService, public route: ActivatedRoute) { 
    route.queryParams.subscribe(param => {
      this.queryParams = {
        ...this.queryParams,
        ...param
      }

      this.params = new HttpParams({fromObject: this.queryParams})

      if(this.queryParams['id']) {
        this.urlForOneProduct = `https://localhost:3000/api/products/${this.queryParams['id']}`

        this.product$ = this.httpService.get<Array<Product>>(this.urlForOneProduct)
        this.product$.subscribe(val => this.subjectProduct$.next(val))
      }
      
      this.products$ = this.httpService.get<Array<Product>>(this.urlForProducts, this.params)      
      this.products$.pipe(
        take(4),
        shareReplay(2)
      ).forEach((val) => this.subjectProducts$.next(val))
    })  
  }
  ngOnInit() {

  }
}
