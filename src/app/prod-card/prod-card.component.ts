import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prod-card',
  template: `
    <p>
      prod-card works!
    </p>
    <app-bage></app-bage>
    <app-rating></app-rating>
    <app-button></app-button>
  `,
  styles: [
  ]
})
export class ProdCardComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
}
