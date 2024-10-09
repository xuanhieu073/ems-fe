import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then((m) => m.About),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/list.component').then((m) => m.ProductListComponent),
  },
  {
    path: 'seed',
    loadComponent: () =>
      import('./seed/seed.component').then((m) => m.SeedComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
];
