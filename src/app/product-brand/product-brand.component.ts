import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-brand',
  template: `
   <a class="prodcard-href" href="#">{{ brandName }}</a>
  `,
  styles: [`
  .prodcard-href {
      font-size: 18px;
    }`
  ]
})
export class ProductBrandComponent implements OnInit {

  @Input() brandName!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
