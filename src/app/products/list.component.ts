import { JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '../components/breadcrumb.component';
import { DangerButtonComponent } from '../components/danger-button.component';
import { HeaderNavComponent } from '../components/header-nav.component';
import { SelectListComponent } from '../components/select-list.component';
import { SquareButtonComponent } from '../components/square-button.component';
import { AppStore } from '../store/app.store';
import { ProductListStore } from './list.store';

@Component({
  standalone: true,
  selector: 'product-list',
  providers: [ProductListStore],
  imports: [
    SquareButtonComponent,
    DangerButtonComponent,
    JsonPipe,
    BreadcrumbComponent,
    FormsModule,
    HeaderNavComponent,
    SelectListComponent,
  ],
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
          <app-select-list
            [categories]="categories$$()"
            [(selectedCategoryId)]="selectedCategoryId"
          />
        </div>
        <div>
          <p class="text-black font-bold tracking-widest text-sm rounded-sm">
            Company
          </p>
          <select
            name="company"
            id="company"
            class="bg-gray-100 text-sm"
            [(ngModel)]="selectedCompanyId"
          >
            <option value="">all</option>
            @for(company of companies$$(); track company.id) {
            <option [value]="company.id">{{ company.name }}</option>
            }
          </select>
        </div>
        <div>
          <p class="text-black font-bold tracking-widest text-sm">Colors</p>
          <app-select-list
            [categories]="colors$$()"
            [(selectedCategoryId)]="selectedColorId"
          />
        </div>
        <div class="felx flex-col gap-y-2">
          <p class="text-black font-bold tracking-widest text-sm">Price</p>
          <p class="text-black font-bold tracking-widest text-sm">From</p>
          <p class="text-xs"><span>$</span>{{ selectedPriceFrom() }}</p>
          <input
            type="range"
            name="price"
            id="price"
            [min]="priceRange$$().min"
            [max]="priceRange$$().max"
            [(ngModel)]="selectedPriceFrom"
          />
          <p class="text-black font-bold tracking-widest text-sm">To</p>
          <p class="text-xs"><span>$</span>{{ selectedPriceTo() }}</p>
          <input
            type="range"
            name="price"
            id="price"
            [min]="priceRange$$().min"
            [max]="priceRange$$().max"
            [(ngModel)]="selectedPriceTo"
          />
        </div>
        <div class="flex justify-between">
          <p>Free Shipping</p>
          <input
            type="checkbox"
            name="freeshiping"
            id="freeshiping"
            [(ngModel)]="isFreeShip"
          />
        </div>
        <app-danger-button
          text="Clear Filters"
          (buttonClick)="clearFilterHandler()"
        />
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
})
export class ProductListComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  productListStore = inject(ProductListStore);
  appState = inject(AppStore);

  vm$$ = this.productListStore.vm$$;
  readonly categories$$ = this.appState.categories$$;
  companies$$ = this.appState.companies$$;
  colors$$ = this.appState.color$$;
  priceRange$$ = this.appState.priceRange$$;

  searchTerm = signal('');
  selectedCategoryId = signal<number | undefined>(undefined);
  selectedCategory = computed(() =>
    this.categories$$().find(
      (category) => category.id === this.selectedCategoryId()
    )
  );
  selectedCompanyId = signal<string>('');
  selectedCompany = computed(() =>
    this.companies$$().find(
      (company) => company.id === +this.selectedCompanyId()
    )
  );
  selectedColorId = signal<number | undefined>(undefined);
  selectedPriceFrom = signal<number | undefined>(this.priceRange$$().min);
  selectedPriceTo = signal<number | undefined>(this.priceRange$$().max);
  isFreeShip = signal<boolean | undefined>(false);

  constructor() {
    effect(() => this.selectedPriceTo.set(this.priceRange$$().max), {
      allowSignalWrites: true,
    });
    effect(() => this.selectedPriceFrom.set(this.priceRange$$().min), {
      allowSignalWrites: true,
    });
    effect(
      () => {
        const filter = {
          query: this.searchTerm(),
          categoryId: this.selectedCategoryId(),
          companyId: Number(this.selectedCompanyId()),
          colorId: this.selectedColorId(),
          fromPrice:
            this.selectedPriceFrom() !== this.priceRange$$().min
              ? this.selectedPriceFrom()
              : undefined,
          toPrice:
            this.selectedPriceTo() !== this.priceRange$$().max
              ? this.selectedPriceTo()
              : undefined,
          isFreeShip: this.isFreeShip(),
        };
        const rawQueryPrams = {
          query: this.searchTerm(),
          category: this.selectedCategory()?.name,
          company: this.selectedCompany()?.name,
        };
        this.productListStore.setFilter(filter);
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  onSubmit() {
    console.log('Submit button clicked');
  }
  clearFilterHandler() {
    this.searchTerm.set('');
    this.selectedCategoryId.set(undefined);
    this.selectedCompanyId.set('');
    this.selectedColorId.set(undefined);
    this.selectedPriceFrom.set(this.priceRange$$().min);
    this.selectedPriceTo.set(this.priceRange$$().max);
    this.isFreeShip.set(false);
  }
}
