import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bage',
  template: `
    <h3 class="prodcard-model">{{ modelName }}</h3>
  `,
  styles: [`
  .prodcard-model{
      font-size: 25px;
    }`
  ]
})
export class BageComponent implements OnInit {
  
  @Input() modelName!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
