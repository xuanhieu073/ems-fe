import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { debounceTime, switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product.service';

export type ProductListState = {
  isLoading: boolean;
  page: number;
  limit: number;
  offset: number;
  products: any;
  query?: string;
  categoryId?: number;
  companyId?: number;
  colorId?: number;
  fromPrice?: number;
  toPrice?: number;
  isFreeShip?: boolean;
};

@Injectable()
export class ProductListStore extends ComponentStore<ProductListState> {
  vm$$ = this.selectSignal((s) => ({
    ...s,
  }));

  paginator$ = this.select(
    this.select((s) => s.limit),
    this.select((s) => s.offset),
    (limit, offset) => ({ limit, offset })
  );

  params$ = this.select(
    this.select((s) => s.query),
    this.select((s) => s.categoryId),
    this.select((s) => s.companyId),
    this.select((s) => s.colorId),
    this.select((s)=> s.fromPrice),
    this.select(s => s.toPrice),
    this.select(s => s.isFreeShip),
    (query, categoryId, companyId, colorId, fromPrice, toPrice, isFreeShip) => ({ query, categoryId, companyId, colorId, fromPrice, toPrice, isFreeShip })
  );

  productService = inject(ProductService);

  constructor() {
    super({
      isLoading: false,
      page: 1,
      limit: 20,
      offset: 0,
      products: [],
      query: '',
    });
    this.fetchFilterEffect(this.params$);
  }

  fetcEffect = this.effect<{ limit: number; offset: number }>((paginator$) =>
    paginator$.pipe(
      debounceTime(500),
      switchMap(({ limit, offset }) => {
        return this.productService.getProducts();
      }),
      tap((result) => {
        this.patchState({
          products: result,
        });
      })
    )
  );

  fetchFilterEffect = this.effect<{
    query?: string;
    categoryId?: number;
    companyId?: number;
    colorId?: number;
  }>((params$) =>
    params$.pipe(
      debounceTime(100),
      switchMap((rawparams) => {
        const params = Object.fromEntries(
          Object.entries(rawparams).filter(([_, v]) => !!v)
        ) as { query: string; categoryId?: number };
        return this.productService.getProductsByFilter(params);
      }),
      tap((products) => {
        this.patchState({
          products,
        });
      })
    )
  );

  setFilter = this.updater<{
    query?: string;
    categoryId?: number;
    companyId?: number;
    colorId?: number;
    fromPrice?: number;
    toPrice?: number;
    isFreeShip?: boolean;
  }>((state, { query, categoryId, companyId, colorId, fromPrice, toPrice, isFreeShip }) => ({
    ...state,
    query,
    categoryId,
    companyId,
    colorId,
    fromPrice,
    toPrice,
    isFreeShip
  }));
}
