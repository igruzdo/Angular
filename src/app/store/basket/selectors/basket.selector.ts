import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Basket } from "../reducers/basket.reduser";

export const selectBasketState = createFeatureSelector<Basket>('basket')

export const selectBasket = createSelector(selectBasketState, (state) => state.basket)
export const selectSumm = createSelector(selectBasketState, (state) => state.basketSum)
export const selectCount = createSelector(selectBasketState, (state) => state.cartCount)