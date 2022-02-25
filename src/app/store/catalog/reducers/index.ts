import { createReducer, on } from "@ngrx/store";
import { CatalogApiActions, CatalogPageActions } from "../actions";
import { CatalogResponse } from "src/app/services/catalog.service";

export interface State {
    products: CatalogResponse | null
    loading: boolean
}

export const initialState: State = {
    products: null,
    loading: false
}

export const reducer = createReducer(
    initialState,
    on(CatalogPageActions.enter, (state) => ({
        ...state,
        loading: true
    })),
    on(CatalogApiActions.loadSuccess, (state, {products}) => ({
        ...state,
        products,
        loading:false
    })),
    on(CatalogApiActions.loadFailure, (state) => ({
        ...state,
        loading:false
    }))
)