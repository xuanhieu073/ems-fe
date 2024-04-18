import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '../components/breadcrumb.component';
import { DangerButtonComponent } from '../components/danger-button.component';
import { SquareButtonComponent } from '../components/square-button.component';
import { ProductListStore } from './list.store';
import { AppStore } from '../store/app-state';
import { HeaderNavComponent } from '../components/header-nav.component';

@Component({
  standalone: true,
  selector: 'product-list',
  providers: [ProductListStore],
  template: `
    <app-header-nav />
    <app-breadcrumb />
    <main class="flex gap-10 container">
      <nav class="w-[200px] flex-shrink-0 flex flex-col gap-5">
        <div>
          <input
            [(ngModel)]="searchTerm"
            type="text"
            placeholder="search"
            class="bg-gray-100 rounded-md w-full p-2"
          />
        </div>
        <div>
          <p class="text-black font-bold tracking-widest text-sm">Category</p>
          <div class="flex flex-col gap-2">
            <p class="underline text-sm text-[#617d98]">All</p>
            @for(category of categories$$(); track category.id) {
            <p class=" text-sm text-[#617d98] cursor-pointer">
              {{ category.name }}
            </p>
            }
          </div>
        </div>
        <div>
          <p class="text-black font-bold tracking-widest text-sm rounded-sm">
            Company
          </p>
          <select name="company" id="company" class="bg-gray-100 text-sm">
            <option value="all">all</option>
            @for(company of companies$$(); track company.id) {
            <option [value]="company.id">{{ company.name }}</option>
            }
          </select>
        </div>
        <div>
          <p class="text-black font-bold tracking-widest text-sm">Colors</p>
          <div class="flex flex-col gap-2">
            <p class="underline text-sm text-[#617d98]">All</p>
            @for(color of colors$$(); track color.id) {
            <p class=" text-sm text-[#617d98] cursor-pointer">
              {{ color.name }}
            </p>
            }
          </div>
        </div>
        <div class="felx flex-col gap-y-2">
          <p class="text-black font-bold tracking-widest text-sm">Price</p>
          <p class="text-xs"><span>$</span>{{ priceRange$$().max }}</p>
          <input
            type="range"
            name="price"
            id="price"
            [min]="priceRange$$().min"
            [max]="priceRange$$().max"
            [ngModel]="priceRange$$().max"
          />
        </div>
        <div class="flex justify-between">
          <p>Free Shipping</p>
          <input type="checkbox" name="freeshiping" id="freeshiping" />
        </div>
        <app-danger-button text="Clear Filters" />
      </nav>
      <section class="flex-1">
        <div class="flex gap-8">
          <div class="flex gap-x-1">
            <app-square-button [active]="true" />
            <app-square-button [active]="false" />
          </div>
          <div>
            <p class="text-[#324d67]">0 Product Found</p>
          </div>
          <div class="flex-1"></div>
          <div class="flex items-center gap-2">
            <p class="text-[#102a42]">Sort by</p>
            <select>
              <option value="price-asc">Price (Lowest)</option>
              <option value="price-asc">Price (Highest)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-asc">Name (Z-A)</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          @for(product of vm$$().products; track product.id) {
          <div>
            <img
              class="w-full h-[165px] object-cover rounded-md"
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div class="flex justify-between">
              <p>{{ product.name }}</p>
              <p><span>$</span>{{ product.price }}</p>
            </div>
          </div>
          }
        </div>
      </section>
    </main>
  `,
  imports: [
    SquareButtonComponent,
    DangerButtonComponent,
    JsonPipe,
    BreadcrumbComponent,
    FormsModule,
    HeaderNavComponent,
  ],
})
export class ProductListComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  productListStore = inject(ProductListStore);
  appState = inject(AppStore);

  vm$$ = this.productListStore.vm$$;
  categories$$ = this.appState.categories$$;
  companies$$ = this.appState.companies$$;
  colors$$ = this.appState.color$$;
  priceRange$$ = this.appState.priceRange$$;

  searchTerm = signal('');

  constructor() {
    effect(() => {
      if (this.searchTerm()) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { search: this.searchTerm() },
          queryParamsHandling: 'merge',
        });
      }
    });
  }
}
