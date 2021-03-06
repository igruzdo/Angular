import { Component, OnInit } from '@angular/core';
import { CatalogResponse, CatalogService } from "../services/catalog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, filter, from, fromEvent, map, Observable, pluck, switchMap, tap, toArray } from "rxjs";
import { Product } from "../types/data.types";
import { BasketItem, BasketService } from "../services/basket.service";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FavoriteService } from '../services/favorite.service';
import { select, Store } from '@ngrx/store';
import * as fromCatalog from './../store/catalog/reducers'
import * as fromBasket from './../store/basket/reducers/basket.reduser'
import { ProductSelectors } from '../store/catalog/selectors';
import { CatalogPageActions } from '../store/catalog/actions';
import { addToBasket } from '../store/basket/actions/basket.actions';


@Component({
  selector: 'app-catalog-page',
  template: `
    <input type="text" placeholder="поиск..." id="search">
    <div class="card-items">
      <app-prod-card *ngFor="let item of searchResult$ | async"
                     [id]= "item.id">
        <div class="favorite" [ngClass]="{inFavorite: item.favorit}">
          <p>В избранное</p>
          <fa-icon class="favorite-icon" [icon]="faHeart" size="lg" (click)="addToFavorite($event, item)"></fa-icon> 
        </div>  
        <app-product-img imgSrc="{{item.image}}"></app-product-img>
        <app-product-brand brandName="{{item.company}}"></app-product-brand>
        <app-bage modelName="{{item.title}}"></app-bage>
        <app-product-price prodCost="{{item.price}}"></app-product-price>
        <app-button color="default" text="Добавить в корзину" (click)="addToCart($event, item)"></app-button>
      </app-prod-card>
      <ng-container *ngIf="!isSearchStart">
        <app-prod-card *ngFor="let item of productArr?.items"
                       [id]= "item.id">
          <div class="favorite" [ngClass]="{inFavorite: item.favorit}">
            <p>В избранное</p>
            <fa-icon class="favorite-icon" [icon]="faHeart" size="lg"  (click)="addToFavorite($event, item)"></fa-icon> 
          </div>            
          <app-product-img imgSrc="{{item.image}}"></app-product-img>
          <app-product-brand brandName="{{item.company}}"></app-product-brand>
          <app-bage modelName="{{item.title}}"></app-bage>
          <app-product-price prodCost="{{item.price}}"></app-product-price>
          <app-button color="default" text="Добавить в корзину" (click)="addToCart($event, item)"></app-button>
        </app-prod-card>
      </ng-container>
      <ng-container *ngIf = "isResultNull <= 0">
        <p>Ничего не найдено</p>
      </ng-container>

      <div class="more" *ngIf="!isSearchStart || isResultNull > 0">
        <app-button text="Загрузить еще" color="success" (click)="showMore()"></app-button>
      </div>
    </div>
    <div class="grid--col-2 cimple-card" *ngForObject = "let prop in this.exampleObj">
      <h3>{{prop.name}}</h3>
      <h3>{{prop.value}}</h3>
    </div>
    <app-button text="Сменить объекст" color="primary" (click)="changeObj()"></app-button>
  `,
  styles: [
    `
    .favorite {
      top:0;
      right:10px;
      position: absolute;
      display:flex;
      align-items:center;
      
      &-icon:hover {
        color: red;
        cursor: pointer;
      }
      p {
        display:inline-block;
        margin-right:10px;
      }
    }

    .inFavorite {
      color: red;
    }
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

  faHeart = faHeart;

  public exampleObj: {
    [key: string]: string | number
  } = {
    example_1: 'one',
    example_2: 'two',
    example_3: 'three',
    example_4: 'four',
    example_5: 'five',
  }
  public productArr!: CatalogResponse | null;
    
  
  public page: number = 1;
  private queryParams = {}
  private cashArr: any[] = []
  public isSearchStart = false;
  public searchResult$: Observable < Array < Product >> = new Observable < Array < Product >> ()
  public isResultNull: any;

  changeObj() {
    this.exampleObj = {
      asdasdasd: 'asdasdas'
    }
  }

  addToFavorite($event: any, item: Product) {
    if (item.favorit) {
      item.favorit = false
      this.favService.removeProduct(item)
    } else {
      item.favorit = true
      this.favService.addProduct(item)
    }
    $event.stopPropagation();
  }

  addToCart($event: any, itemIn:any) {
    let item:BasketItem = {
      id: itemIn.id,
      cost: itemIn.price,
      model: itemIn.title,
      count: 1
    }
    this.storeBasket.dispatch(addToBasket({item}))
    $event.stopPropagation();
  }

  showMore() {

    if (this.productArr?.meta['currentPage'] == this.productArr?.meta['totalPages']) {
      this.page = 1;
    } else {
      this.page++
    }
    const limit = (this.page * 10).toString()
    this.router.navigate(['.'], {
      relativeTo: this.rout,
      queryParams: {
        limit
      }
    })
  }

  public searchProduct(searchTerm: string): Observable < Array < Product >> {
    this.isSearchStart = true;
    return from(this.productArr!.items).pipe(
      filter(product => product.title.toLowerCase().indexOf(searchTerm) !== -1),
      toArray()
    )
  }

  public findFavorits() {
    this.favService.productsInFavorites$.subscribe(items => {
      items.forEach(prodinFav => {
        this.productArr?.items.forEach(listProdItem => {
          if (listProdItem.id == prodinFav.product.id) {
            listProdItem.favorit = true
          }
        })
      })
    })
  }


  public search() {
    const search: any = document.querySelector('#search')

    this.searchResult$ = fromEvent(search, 'input').pipe(
      pluck('target', 'value'),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: any) => this.searchProduct(searchTerm.toLowerCase())),
      tap(el => console.log(el)),
    )

  }

  constructor(private service: CatalogService, private rout: ActivatedRoute, private router: Router, public BasketService: BasketService, private favService: FavoriteService, private store: Store<fromCatalog.State>, private storeBasket: Store<fromBasket.Basket>) {
    this.productArr = {
      meta: {},
      items: []
    }
  }

  ngOnInit(): void {

    this.search()

    this.searchResult$.subscribe(val => {
      this.isResultNull = val.length
    })

    // this.service.subjectProducts$.subscribe(value => {
    //   this.productArr = value
    //   this.findFavorits()
    // })

    this.store.dispatch(CatalogPageActions.enter())

    this.store.pipe(
    select(ProductSelectors.selectProducts),
    ).subscribe(val => this.productArr = val);
  }
}
