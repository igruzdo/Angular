import {Component, ContentChild, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService} from "../services/catalog.service";
import {BasketService} from "../services/basket.service";

@Component({
  selector: 'app-product-page',
  template: `
  <div class="product-page">
    <app-prod-card (selected)="select($event)">
        <app-product-img imgSrc="{{itemData.image}}"></app-product-img>
        <app-product-brand brandName="{{itemData.company}}"></app-product-brand>
        <app-bage modelName="{{itemData.title}}"></app-bage>
        <app-product-price prodCost="{{itemData.price}}"></app-product-price>
        <app-button color="default" text="Добавить в корзину" (click)="addToCart($event, itemData.id, itemData.price, itemData.title)"></app-button>
    </app-prod-card>
    <app-tabs>
    <ng-container ngProjectAs="app-tabs-header" *ngFor="let item of tabs">
      <app-tabs-header [tabHeaderCount]="item['id']">
        <div>{{item['head']}}</div>
      </app-tabs-header>
      </ng-container>
      <ng-container ngProjectAs="app-tabs-header" *ngFor="let item of tabs">
        <app-tabs-body [tabContentCount]="item['id']">
          <div>{{item['content']}}</div>
        </app-tabs-body>
      </ng-container>
    </app-tabs>
  </div>
    
  `,
  styles: [`
  .product-page {
      display: flex;
    }
    `
  ]
})
export class ProductPageComponent implements OnInit {
  
  @Output() selected = new EventEmitter();

  public itemData:any = {};
  public params: {[key:string]: any};

  public tabs: {[key:string]: string | number}[] = [
    {
      id: 1,
      head: 'Описание',
      content: 'Содержимое описания'
    },
    {
      id: 2,
      head: 'Характеристики',
      content: 'Содержимое характеристики'
    },
    {
      id: 3,
      head: 'Наличие в магазинах',
      content: 'Содержимое наличие в магазинах'
    },
    {
      id: 4,
      head: 'Отзывы',
      content: 'Содержимое отзывы'
    },
    {
      id: 5,
      head: 'Рассрочка и кредит',
      content: 'Содержимое рассрочка и кредит'
    }
  ]

  addToCart($event:any, id:any, cost:any, model:any) {
    this.BasketService.addProduct({
      id: id,
      cost: cost,
      model: model,
      count: 1
    })
    $event.stopPropagation();
    console.log($event)
  }

  select(val:any){
    this.selected.emit(val)
  }

  constructor(private rout: ActivatedRoute, public service: CatalogService, public BasketService:BasketService) {
    this.params = this.rout.snapshot.queryParams
    this.service.getProduct(this.params['id']).subscribe(params => {
      this.itemData = params
    })
  }

  ngOnInit(): void {

  }

}
