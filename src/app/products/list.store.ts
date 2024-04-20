import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { debounceTime, switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

export type ProductListState = {
  isLoading: boolean;
  page: number;
  limit: number;
  offset: number;
  products: any;
  query: string;
  categoryId?: number;
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
    (query, categoryId) => ({ query, categoryId })
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
      categoryId: undefined,
    });
    // this.fetcEffect(this.paginator$);
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

  fetchFilterEffect = this.effect<{ query: string; categoryId?: number }>(
    (params$) =>
      params$.pipe(
        debounceTime(100),
        switchMap(({ query, categoryId }) => {
          console.log(
            '🚀 ~ ProductListStore ~ switchMap ~ { query, categoryId }:',
            { query, categoryId }
          );
          return this.productService.getProductsByFilter(query, categoryId);
        }),
        tap((products) => {
          this.patchState({
            products,
          });
        })
      )
  );

  setFilter = this.updater<{ query: string }>((state, { query }) => ({
    ...state,
    query,
  }));

  setCategoryId = this.updater<{ categoryId?: number }>(
    (state, { categoryId }) => ({
      ...state,
      categoryId,
    })
  );

  setCompanyId = this.updater<{ companyId?: number }>(
    (state, { companyId }) => ({
      ...state,
      companyId,
    })
  );
}
