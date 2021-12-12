import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../services/catalog.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-catalog-page',
  template: `
    <div class="card-items">
      <app-prod-card *ngFor="let item of productArr"
                     [src] = "item.img"
                     [name] = "item.name"
                     [model] = "item.model"
                     [cost] = "item.cost"
                     [id]= "item.id">
      </app-prod-card>
    </div>
  `,
  styles: [
    `.card-items {
      display: flex;
    }`
  ]
})

export class CatalogPageComponent implements OnInit {

  public productArr:any = [];
  public filter: string = '';

  constructor(public service: CatalogService, private rout: ActivatedRoute) {
    rout.queryParams.subscribe(param => {
      this.productArr = this.service.getProducts(param['filter']);
    })
  }

  ngOnInit(): void {
    this.filter = this.rout.snapshot.queryParams['filter']
    this.productArr = this.service.getProducts(this.filter);
  }
}
