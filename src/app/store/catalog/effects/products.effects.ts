import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CatalogResponse, CatalogService } from "src/app/services/catalog.service";
import { CatalogApiActions, CatalogPageActions } from "../actions";



@Injectable()
export class ProductsEffects {
    loadProducts$ = createEffect(() => this.actions$.pipe(
            ofType(CatalogPageActions.enter),
            switchMap((_) => this.catalogService.subjectProducts$.pipe(
                map((products: CatalogResponse) => CatalogApiActions.loadSuccess({products})),
                catchError((error) => of(CatalogApiActions.loadFailure({error})))
            ))
        )
    )

    constructor(private actions$: Actions, private catalogService: CatalogService) {}
}