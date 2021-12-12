import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService} from "../services/catalog.service";


@Component({
  selector: 'app-catalog',
  template: `
    <app-basket></app-basket>
    <app-toggle [toggles]="toggle" (changed)="doCatalogFilter($event)" [value]="value"></app-toggle>
    <div class="card-items">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
  ]
})
export class CatalogComponent implements OnInit {
  public value:string = '';
  public filter:string = '';
  public cartTrigger:string = 'click';

  toggle:any[] = [
    {
      value: 'default',
      label: 'Показать все'
    },
    {
      value: 'available',
      label: 'В наличии'
    },
    {
      value: 'discount',
      label: 'Со скидкой'
    }
  ]

  doCatalogFilter(value:any){
    let itemValue:string =  value
    switch (itemValue){
      case "available":
        this.value = itemValue
        break;
      case "discount":
        this.value = itemValue
        break;
      case "default":
        this.value = itemValue
        break;
    }
    this.filter = this.rout.snapshot.queryParams['filter']
  }


  constructor(private rout: ActivatedRoute, public service: CatalogService) {
    this.filter = this.rout.snapshot.queryParams['filter']
    this.doCatalogFilter(this.filter)
  }

  ngOnInit(): void {

  }
}
