import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from "../services/basket.service";


@Component({
  selector: 'app-prod-card',
  template: `
    <div class="prodcard" 
    [routerLink]="['/catalog/product']"
    [queryParams]="{id: id}">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .prodcard {
      display: flex;
      position:relative;
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

      &:hover {
        transform: scale(1.03);
        transition: all 0.4s ease;
       }
    }`
  ]
})
export class ProdCardComponent implements OnInit {

  @Input() id?: number = 0;
  constructor(public service:BasketService) { }
  ngOnInit(): void {
  }
}
