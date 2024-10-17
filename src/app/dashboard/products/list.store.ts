import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../../models/product';
import { inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/component-store';
// import { tapResponse } from '@ngrx/operators';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const ProductStore = signalStore(
  withState(initialState),
  withMethods((store, productService = inject(ProductService)) => ({
    updateQuery(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return productService.getProductsByFilter({ query }).pipe(
            tapResponse({
              next: (products) =>
                patchState(store, { products, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false }), console.error(err);
              },
            })
          );
        })
      )
    ),
    deleteById(id: number): void {
      patchState(store, (state) => {
        const products = state.products.filter((product) => product.id !== id);
        return { products };
      });
    },
  }))
);
