import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: "products",
  loadComponent: () => import('./products/list.component').then(m => m.ProductListComponent)
}];
