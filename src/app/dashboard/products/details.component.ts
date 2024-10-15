import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports, HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { filter, map, pipe, take, tap } from 'rxjs';
import { DetailsStore } from '../../products/details.store';
import { AppStore } from '../../store/app.store';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Product } from '../../models/product';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmSelectModule,
    HlmInputDirective,
    HlmSelectImports,
    BrnSelectImports,
    HlmButtonModule,
    HlmCheckboxComponent,
    HlmToasterComponent,
  ],
  providers: [DetailsStore],
  template: `
    <form
      [formGroup]="productForm"
      (ngSubmit)="updateProductHandler()"
      class="space-y-6 flex flex-col items-center"
    >
      <hlm-form-field>
        <input
          aria-label="Product Name"
          formControlName="name"
          class="w-80"
          hlmInput
          type="text"
          placeholder="Product Name"
        />
        <hlm-error>Your name is required</hlm-error>
      </hlm-form-field>
      <hlm-form-field>
        <div class="flex items-center w-80 max-w-sm space-x-2">
          <button hlmBtn variant="ghost">$</button>
          <input
            type="number"
            aria-label="Price"
            formControlName="price"
            class="flex-1"
            hlmInput
            placeholder="Price"
          />
        </div>
      </hlm-form-field>
      <hlm-form-field>
        <textarea
          hlmInput
          aria-label="Description"
          formControlName="description"
          class="min-h-[80px] w-80"
          placeholder="Description"
        ></textarea>
      </hlm-form-field>
      <hlm-form-field>
        <label class="flex items-start w-80" hlmLabel>
          <hlm-checkbox hlmInput formControlName="freeShip" class="mr-2" />
          freeShip
        </label>
      </hlm-form-field>
      <hlm-form-field>
        <brn-select
          class="inline-block"
          placeholder="Select category"
          formControlName="categoryId"
        >
          <hlm-select-trigger class="w-80">
            <hlm-select-value />
          </hlm-select-trigger>
          <hlm-select-content>
            <hlm-select-label>Category</hlm-select-label>
            @for (category of appStore.categories$$(); track category.id) {
            <hlm-option [value]="category.id">{{ category.name }}</hlm-option>
            }
          </hlm-select-content>
        </brn-select>
        <hlm-error>The fruit is required</hlm-error>
      </hlm-form-field>
      <hlm-form-field>
        <brn-select
          class="inline-block"
          placeholder="Select company"
          formControlName="companyId"
        >
          <hlm-select-trigger class="w-80">
            <hlm-select-value />
          </hlm-select-trigger>
          <hlm-select-content>
            <hlm-select-label>Company</hlm-select-label>
            @for (company of appStore.companies$$(); track company.id) {
            <hlm-option [value]="company.id">{{ company.name }}</hlm-option>
            }
          </hlm-select-content>
        </brn-select>
      </hlm-form-field>
      <hlm-form-field>
        <brn-select
          class="inline-block"
          placeholder="Select some color"
          formControlName="colorsId"
          [multiple]="true"
        >
          <hlm-select-trigger class="w-80">
            <hlm-select-value />
          </hlm-select-trigger>
          <hlm-select-content>
            @for(color of appStore.color$$(); track color.id) {
            <hlm-option [value]="color.id">
              <span
                [style.background-color]="color.hexValue"
                class="w-4 h-4 rounded-sm mr-1"
              ></span>
              {{ color.name }}
            </hlm-option>
            }
          </hlm-select-content>
        </brn-select>
      </hlm-form-field>
      <button type="submit" hlmBtn>Submit</button>
    </form>
  `,
})
export class DetailsComponent {
  store = inject(DetailsStore);
  route = inject(ActivatedRoute);
  appStore = inject(AppStore);

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl<number | null>(null, [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    freeShip: new FormControl(false),
    companyId: new FormControl<number | null>(null),
    colorsId: new FormControl<number[]>([]),
  });

  productId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('slug'))))
  );

  snapshotProduct = rxMethod<Product | null>(
    pipe(
      filter((product) => !!product),
      take(1),
      tap((product) => {
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          description: product.description,
          freeShip: product.freeShip,
          categoryId: product.categoryId,
          companyId: product.companyId,
          colorsId: product.colorsId,
        });
      })
    )
  );

  constructor() {
    this.store.loadById(this.productId()!);
    this.snapshotProduct(this.store.product);
  }

  updateProductHandler() {
    const formValue = this.productForm.value as Product;
    this.store.updateProduct({ id: this.productId()!, product: formValue });

    toast('product has been saved!', {});
  }
}
