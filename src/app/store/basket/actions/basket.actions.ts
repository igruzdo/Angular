import { createAction, props } from "@ngrx/store";
import { BasketItem } from "src/app/services/basket.service";
import { Basket } from "../reducers/basket.reduser";

export const initBasket = createAction('[Basket] Init')

export const addToBasket = createAction('[Basket] Add product', props<{item: BasketItem}>())

export const removeFromBasket = createAction('[Basket] Remove product', props<{id: number}>())

export const clearBasket = createAction('[Basket] Clear basket')

export const refreshBasket = createAction('[Basket] Refresh', props<{newState: Basket}>())

