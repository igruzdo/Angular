import { createAction, props } from "@ngrx/store";
import { CatalogResponse } from "src/app/services/catalog.service";

export const loadSuccess = createAction('[Catalog Api] Load products success', props<{products: CatalogResponse}>())

export const loadFailure = createAction('[Catalog Api] Load products failure', props<{error: any}>())