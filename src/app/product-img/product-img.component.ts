import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-img',
  template: `
  <img class="prodcard-img"
    src="{{ imgSrc }}"
    alt="prodimg">
  `,
  styles: [`
  .prodcard-img {
      display: block;
      width: 200px;
      cursor: pointer;
    }`
  ]
})
export class ProductImgComponent implements OnInit {

  @Input() imgSrc!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
