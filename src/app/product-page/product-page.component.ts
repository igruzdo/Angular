import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService} from "../services/catalog.service";

@Component({
  selector: 'app-product-page',
  template: `
    <app-prod-card (selected)="select($event)"
                   [src] = "itemData.image"
                   [name] = "itemData.company"
                   [model] = "itemData.title"
                   [cost] = "itemData.price"
                   [id]= "itemData.id">
    </app-prod-card>
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab autem dolor, doloremque facilis magni nesciunt officia perspiciatis vel? Accusantium at consequatur distinctio, dolore error ex excepturi id iure laudantium minus molestias mollitia neque officia praesentium quas quis quod quos repudiandae. Ad aliquid animi consequuntur cumque esse impedit maiores porro saepe vel, veritatis. Aliquid culpa deleniti dolores ducimus enim, eos ex expedita laborum minima natus odio odit porro possimus quaerat sit suscipit vitae voluptatibus. Dicta doloremque error exercitationem fugiat illo ipsa labore natus officia rem, velit! Cum ipsam officia rem sed similique, tempora ut. Delectus error explicabo praesentium recusandae saepe vitae.</div>
  `,
  styles: [
  ]
})
export class ProductPageComponent implements OnInit {

  public itemData:any = {};
  public params: {[key:string]: any};

  @Output() selected = new EventEmitter();

  select(val:any){
    this.selected.emit(val)
  }

  constructor(private rout: ActivatedRoute, public service: CatalogService) {
    this.params = this.rout.snapshot.queryParams
    this.service.getProduct(this.params['id']).subscribe(params => {
      this.itemData = params
    })
  }

  ngOnInit(): void {

  }

}
