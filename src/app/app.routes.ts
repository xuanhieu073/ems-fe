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
    path: 'products/:slug',
    loadComponent: () =>
      import('./products/details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/list.component').then((m) => m.CartListComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/layout.component').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./dashboard/products/list.component').then(
            (m) => m.DashboardProductListComponent
          ),
      },
      {
        path: 'products/details/:slug',
        loadComponent: () =>
          import('./dashboard/products/details.component').then(
            (m) => m.DetailsComponent
          ),
      },
      {
        path: 'products/create',
        loadComponent: () =>
          import('./dashboard/products/create.component').then(
            (m) => m.CreateComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./dashboard/users/list.component').then(
            (m) => m.DashboardUserListComponent
          ),
      },
      // {
      //   path: 'seed',
      //   loadComponent: () =>
      //     import('./seed/seed.component').then((m) => m.SeedComponent),
      // },
    ],
  },
];
