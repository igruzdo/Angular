import {Component, OnInit} from '@angular/core';
import {CatalogResponse, CatalogService} from "../services/catalog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  iif,
  map,
  Observable,
  of,
  pluck,
  switchMap,
  tap,
  toArray
} from "rxjs";
import {Product} from "../types/data.types";

@Component({
  selector: 'app-catalog-page',
  template: `
    <input type="text" placeholder="поиск..." id="search">
    <div class="card-items">
      <app-prod-card *ngFor="let item of searchResult$ | async"
                     [src] = "item.image"
                     [name] = "item.company"
                     [model] = "item.title"
                     [cost] = "item.price"
                     [id]= "item.id">
      </app-prod-card>
      <ng-container *ngIf="!isSearchStart">
        <app-prod-card *ngFor="let item of productArr.items"
                       [src] = "item.image"
                       [name] = "item.company"
                       [model] = "item.title"
                       [cost] = "item.price"
                       [id]= "item.id">
        </app-prod-card>
      </ng-container>
      <ng-container *ngIf = "isResultNull <= 0">
        <p>Ничего не найдено</p>
      </ng-container>
      <div class="more" *ngIf="!isSearchStart || isResultNull > 0">
        <app-button text="Загрузить еще" color="success" (click)="showMore()"></app-button>
      </div>
    </div>
  `,
  styles: [
    `
      #search{
        margin-left: 10px;
        margin-top: 20px;
        background-color: aliceblue;
        padding-left: 10px;
        border-radius: 5px ;
      }
      .more {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .card-items {
      display: flex;
      flex-wrap: wrap;
    }`
  ]
})

export class CatalogPageComponent implements OnInit {

  public productArr: CatalogResponse;
  public page:number = 1;
  private queryParams = {}
  private cashArr:any[] = []

  public isSearchStart = false;

  public searchResult$: Observable<Array<Product>> = new Observable<Array<Product>>()

  public isResultNull:any;

  showMore() {

    if(this.productArr.meta['currentPage'] == this.productArr.meta['totalPages']){
      this.page = 1;
    } else {
      this.page++
    }
    const limit = (this.page * 10).toString()
    this.router.navigate(['.'], {relativeTo: this.rout, queryParams: {limit}})
  }


  public searchProduct(searchTerm: string):Observable<Array<Product>> {
    this.isSearchStart = true;
    return from(this.productArr.items).pipe(
      filter(product => product.title.toLowerCase().indexOf(searchTerm) !== -1),
      toArray()
    )
  }

  constructor(private service: CatalogService, private rout: ActivatedRoute, private router: Router) {


    this.productArr = {
      meta:{ },
      items:[]
    }

    rout.queryParams.subscribe(param => {

      this.queryParams = {
        ...this.queryParams,
        ...param
      }
      this.router.navigate(['.'], {relativeTo: this.rout, queryParams: this.queryParams})

      let isChecked = this.cashArr.some(el => el.url === document.location.href)

      if (isChecked) {
        this.cashArr.forEach(elem => {
          if (elem.url === document.location.href) {
            console.log('from cash')
            this.productArr = elem.response
          }
        })
      } else {
        this.service.getProducts({...this.queryParams}).subscribe(value => {
          this.productArr = value
          this.cashArr.push({
            url: document.location.href,
            response: value
          })
          console.log(this.cashArr)
        })
        console.log('from api')
      }
    })
  }

  ngOnInit(): void {
    const search:any = document.querySelector('#search')

    this.searchResult$ = fromEvent(search, 'input').pipe(
      pluck('target', 'value'),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: any) => this.searchProduct(searchTerm.toLowerCase())),
      tap(el => console.log(el)),
    )

    this.searchResult$.subscribe(val => {
      this.isResultNull = val.length
    })
  }
}
