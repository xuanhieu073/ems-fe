import { Injectable, inject } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store'
import { debounceTime, switchMap, tap } from 'rxjs'
import { ProductService } from "../services/product.service";

export type ProductListState = {
  isLoading: boolean;
  page: number;
  limit: number;
  offset: number;
  products: any;
}

@Injectable()
export class ProductListStore extends ComponentStore<ProductListState> {
  
  vm$$ = this.selectSignal(s => ({
    ...s,
  }))

  paginator$ = this.select(
    this.select(s => s.limit),
    this.select(s => s.offset),
    (limit, offset) => ({limit, offset})
  );

  productService = inject(ProductService);

  constructor() {
    super({
      isLoading: false,
      page: 1,
      limit: 20,
      offset: 0,
      products: []
    })
    this.fetcEffect(this.paginator$)
  }

  fetcEffect = this.effect<{limit: number, offset: number}>(paginator$ => 
    paginator$.pipe(
      debounceTime(500),
      switchMap(({limit, offset}) => {
        return this.productService.getProducts();
      }),
      tap(result => {
        this.patchState({
          products: result
        })
      })
    )
  )
}