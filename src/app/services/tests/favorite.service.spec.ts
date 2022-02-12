import { TestBed } from "@angular/core/testing";
import { Product } from "src/app/types/data.types";
import { FavoriteService } from "../favorite.service";

describe('FavoriteService', () => {
    let service: FavoriteService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(FavoriteService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('return count', () => {
        let actualCount: number|undefined
        service.productsCount$.subscribe((val:number) => {
            actualCount = val
        })
        expect(actualCount).toBe(0)
    })

    it('shold increase count prods', () => {
        let actualCount: number|undefined
        let product: Product = {
            title: "Some prod"
        }
        service.addProduct(product)
        service.productsCount$.subscribe((val:number) => {
            actualCount = val
        })
        expect(actualCount).toBe(1)       
    })

    it('shold decrease count prods', () => {
        let actualCount: number|undefined
        let product: Product = {
            id: 1,
            title: "Some prod"
        }
        service.addProduct(product)
        service.removeProduct(product)
        service.productsCount$.subscribe((val:number) => {
            actualCount = val
        })
        expect(actualCount).toBe(0)       
    })

    it('check prod in favorites', () => {
        let item: any = {}

        let product: Product = {
            id: 1,
            title: "Some prod"
        }
        service.addProduct(product)
        service.productsInFavorites$.subscribe((val) => {
            item = val[0]
        })
        expect(item.product).toEqual(product)       
    })
})