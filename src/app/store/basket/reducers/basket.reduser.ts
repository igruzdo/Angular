import { createReducer, on } from "@ngrx/store"
import { BasketItem } from "src/app/services/basket.service"
import * as BasketActions from "../actions/basket.actions"
import { BasketService } from "src/app/services/basket.service"

export interface Basket {
    basket:Array<BasketItem>,
    cartCount: number
    basketSum: number
}

export const initialBasketState: Basket = {
    basket: [],
    cartCount: 0,
    basketSum: 0
} 

export const reducer = createReducer(
    initialBasketState,
    on(BasketActions.refreshBasket, (state, {newState}) =>({
        ...state,
        newState
    })),
    on(BasketActions.clearBasket, (state) => {
        return {
            basket: [],
            cartCount: 0,
            basketSum: 0
        }
    })
)