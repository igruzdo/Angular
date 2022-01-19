import { Component, OnInit, Input } from '@angular/core';
import { BasketService } from "../services/basket.service";


@Component({
  selector: 'app-prod-card',
  template: `
    <div class="prodcard" 
    [routerLink]="['/catalog/product']"
    [queryParams]="{id: id}">
      <ng-content></ng-content>
      <!-- <app-button color="default" text="Добавить в корзину" (click)="addToCart($event)"></app-button> -->
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
    }`
  ]
})
export class ProdCardComponent implements OnInit {
  // @Input() src?: string = "#";
  // @Input() name?: string = "Name";
  // @Input() model?: string = "model";
  // @Input() cost?: number = 99999;
  @Input() id?: number = 0;

  // addToCart($event:any) {
  //   this.service.addProduct({
  //     id: this.id,
  //     cost: this.cost,
  //     model: this.model,
  //     count: 1
  //   })
  //   $event.stopPropagation();
  //   console.log($event)
  // }

  constructor(public service:BasketService) { }
  ngOnInit(): void {
  }
}
