import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CategoryService } from '../services/category.service';
import { Color, ColorService } from '../services/color.service';
import { Company, CompanyService } from '../services/company.service';
import { PriceRange, ProductService } from '../services/product.service';
import { Category } from '../models/category';

export type AppState = {
  categories: Category[];
  companies: Company[];
  colors: Color[];
  priceRange: PriceRange;
};

@Injectable({ providedIn: 'root' })
export class AppStore extends ComponentStore<AppState> {
  private categoryService = inject(CategoryService);
  private companyService = inject(CompanyService);
  private colorService = inject(ColorService);
  private productService = inject(ProductService);

  categories$$ = this.selectSignal((s) => s.categories);
  companies$$ = this.selectSignal((s) => s.companies);
  color$$ = this.selectSignal((s) => s.colors);
  priceRange$$ = this.selectSignal((s) => s.priceRange);

  constructor() {
    super({
      categories: [],
      companies: [],
      colors: [],
      priceRange: { min: 0, max: 0 },
    });
    this.categoryService
      .getCategories()
      .subscribe((categories) => this.patchState({ categories }));
    this.companyService
      .getCompanies()
      .subscribe((companies) => this.patchState({ companies }));
    this.colorService
      .getColors()
      .subscribe((colors) => this.patchState({ colors }));
    this.productService
      .getPriceRange()
      .subscribe((priceRange) => this.patchState({ priceRange }));
  }
}
