import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BasketService} from "../services/basket.service";


@Component({
  selector: 'app-prod-card',
  template: `
    <div class="prodcard">
      <img class="prodcard-img"
           src="{{ src }}"
           alt="prodimg"
           [routerLink]="['/catalog/product']"
           [queryParams]="{id: id}">
      <a class="prodcard-href" href="#">{{ name }}</a>
      <h3 class="prodcard-model">{{ model }}</h3>
      <span class="prodcard-cost">{{cost | currency: 'RUB':'symbol-narrow':'3.0': 'ru'}}</span>
      <app-button color="default" text="Добавить в корзину" (click)="addToCart()"></app-button>
    </div>
  `,
  styles: [`
    .prodcard {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      margin: 15px;
      padding: 30px 35px;
      font-family: Inter;
      width: 220px;
      height: 510px;
      border: 2px solid #CCC;
      border-radius: 20px;
      transition: all 0.4s ease;

      &:hover{
        transform: scale(1.03);
        transition: all 0.4s ease;
       }
    }
    .prodcard-img {
      display: block;
      width: 200px;
      cursor: pointer;
    }
    .prodcard-href {
      font-size: 18px;
    }
    .prodcard-model{
      font-size: 25px;
    }
    .prodcard-cost {
      font-size: 30px;
      font-weight: 500;
    }`
  ]
})
export class ProdCardComponent implements OnInit {
  @Input() src?: string = "#";
  @Input() name?: string = "Name";
  @Input() model?: string = "model";
  @Input() cost?: number = 99999;
  @Input() id?: number = 0;

  addToCart() {
    this.service.addProduct({
      id: this.id,
      cost: this.cost,
      model: this.model,
      count: 1
    })
  }

  constructor(public service:BasketService) { }
  ngOnInit(): void {
  }
}
