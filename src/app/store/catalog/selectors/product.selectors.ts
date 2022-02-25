import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../reducers";





export const selectProductState = createFeatureSelector<State>('catalog')

export const selectProducts = createSelector(selectProductState, (state) => state.products)
export const selectLoading = createSelector(selectProductState, (state) => state.loading)