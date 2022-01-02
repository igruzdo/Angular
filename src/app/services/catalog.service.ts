import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
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
export class CatalogService {

  private cash:Request[] = [];

  getProducts(queryParams:{[key: string]: string}):Observable<any> {
    const url = 'https://localhost:3000/api/products/'
    const params = new HttpParams({fromObject: queryParams})
    return this.httpService.get<Array<Product>>(url, params);
  }

  getProduct(id:string):Observable<any> {
    const url = `https://localhost:3000/api/products/${id}`
    return this.httpService.get<Array<Product>>(url);
  }
  constructor(public service: DataService, private httpService: HttpService, public route: ActivatedRoute) { }
}
