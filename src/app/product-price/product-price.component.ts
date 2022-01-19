import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-price',
  template: `
    <span class="prodcard-cost">{{prodCost | currency: 'RUB':'symbol-narrow':'3.0': 'ru'}}</span>
  `,
  styles: [`
  .prodcard-cost {
      font-size: 30px;
      font-weight: 500;
    }`
  ]
})
export class ProductPriceComponent implements OnInit {

  @Input() prodCost!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
