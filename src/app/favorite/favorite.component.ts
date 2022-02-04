import {
  Component,
  OnInit,
  Output
} from '@angular/core';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorite',
  template: `
  
  <button type="button" class="btn btn-primary mt-1">
    Избранное <span class="badge custom" *ngIf="count > 0">
    {{ count }}
    </span>
  </button>

  `,
  styles: [`
  @import '../theme/bootstrap.css';
  .custom {
    background-color:red;
  }
  `]
})
export class FavoriteComponent implements OnInit {
 
  public productsInFavorite = this.favServis.productsInFavorites$

  public count!:number

  public productsCount$ = this.favServis.productsCount$.subscribe(value => this.count = value)


  constructor(protected favServis: FavoriteService) {}

  ngOnInit(): void {}

}
