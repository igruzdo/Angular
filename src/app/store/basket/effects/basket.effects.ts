import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { BasketService } from "src/app/services/basket.service";
import * as BasketActions from "../actions/basket.actions"



@Injectable()
export class BasketEffects {
    loadBasket$ = createEffect(() => this.actions$.pipe(
            ofType(BasketActions.initBasket),
            map(() => {
                this.basketService.initBasket()
                let newState =  {
                    basket: this.basketService.basket,
                    cartCount: this.basketService.cartCount,
                    basketSum: this.basketService.basketSum
                }
                return BasketActions.refreshBasket({newState})
            })
        )
    )

    addToBasket$ = createEffect(() => this.actions$.pipe(
            ofType(BasketActions.addToBasket),
            map((item) => {
                this.basketService.addProduct(item.item)
                let newState =  {
                    basket: this.basketService.basket,
                    cartCount: this.basketService.cartCount,
                    basketSum: this.basketService.basketSum
                }
                console.log(newState)
                return BasketActions.refreshBasket({newState})
            })
        )   
    )

    removeFromBasket$ = createEffect(() => this.actions$.pipe(
            ofType(BasketActions.removeFromBasket),
            map(({id}) => {
                this.basketService.removeProduct(id)
                let newState =  {
                    basket: this.basketService.basket,
                    cartCount: this.basketService.cartCount,
                    basketSum: this.basketService.basketSum
                }
                console.log(newState)
                return BasketActions.refreshBasket({newState})
            })
        )
    )
    clearBasket$ = createEffect(() => this.actions$.pipe(
            ofType(BasketActions.clearBasket),
            map(() => {
                this.basketService.clearBasket()
                let newState =  {
                    basket: this.basketService.basket,
                    cartCount: this.basketService.cartCount,
                    basketSum: this.basketService.basketSum
                }
                return BasketActions.refreshBasket({newState})
            })
        )
    )

    constructor(private actions$: Actions, private basketService: BasketService) {}
}