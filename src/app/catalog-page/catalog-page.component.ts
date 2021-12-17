import {Component, OnInit} from '@angular/core';
import {CatalogResponse, CatalogService} from "../services/catalog.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-catalog-page',
  template: `
    <div class="card-items">
      <app-prod-card *ngFor="let item of productArr.items"
                     [src] = "item.image"
                     [name] = "item.company"
                     [model] = "item.title"
                     [cost] = "item.price"
                     [id]= "item.id">
      </app-prod-card>
      <div class="more">
        <app-button text="Загрузить еще" color="success" (click)="showMore()"></app-button>
      </div>
    </div>
  `,
  styles: [
    `
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

  showMore() {

    if(this.productArr.meta['currentPage'] == this.productArr.meta['totalPages']){
      this.page = 1;
    } else {
      this.page++
    }
    const limit = (this.page * 10).toString()
    this.router.navigate(['.'], {relativeTo: this.rout, queryParams: {limit}})
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
        this.service.getProducts({...this.queryParams}).subscribe(value => this.productArr = value)
    })
  }

  ngOnInit(): void {
  }
}
