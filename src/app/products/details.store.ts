import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/component-store';

type DetailsState = {
  product: Product | null;
  isLoading: boolean;
};

const initialState: DetailsState = {
  product: null,
  isLoading: false,
};

export const DetailsStore = signalStore(
  withState(initialState),
  withMethods((store, productService = inject(ProductService)) => ({
    loadById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return productService.getProductById(id).pipe(
            tapResponse({
              next: (product) =>
                patchState(store, { product, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
              },
            })
          );
        })
      )
    ),
    updateProduct: rxMethod<{ id: number; product: Product }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, product }) => {
          return productService.updateProduct(id, product).pipe(
            tapResponse({
              next: (product) =>
                patchState(store, { product, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
              },
            })
          );
        })
      )
    ),
  }))
);
