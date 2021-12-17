import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService} from "../services/catalog.service";


@Component({
  selector: 'app-catalog',
  template: `
    <div class="header">
      <app-basket></app-basket>
      <app-toggle [toggles]="toggle" (changed)="doCatalogFilter($event)" [value]="value"></app-toggle>
    </div>
    <div class="card-items">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
  .header {
    display: flex;
  }
  `
  ]
})
export class CatalogComponent implements OnInit {
  public value:string = '';
  public filter:string = '';
  public cartTrigger:string = 'click';

  toggle:any[] = [
    {
      value: 'title',
      label: 'Сортировка по названию'
    },
    {
      value: 'price',
      label: 'Сортировка по цене'
    },
    {
      value: 'company',
      label: 'Сортировка по производителю'
    }
  ]

  doCatalogFilter(value:any){
    let itemValue:string =  value
    switch (itemValue){
      case "title":
        this.value = itemValue
        break;
      case "price":
        this.value = itemValue
        break;
      case "company":
        this.value = itemValue
        break;
      default:
        this.value = ''
    }
    this.filter = this.rout.snapshot.queryParams['orderBy']
  }


  constructor(private rout: ActivatedRoute, public service: CatalogService) {
    this.filter = this.rout.snapshot.queryParams['orderBy']
    this.doCatalogFilter(this.filter)
  }

  ngOnInit(): void {

  }
}
