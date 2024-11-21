import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideStar } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { map, switchMap, tap } from 'rxjs';
import { BreadcrumbComponent } from "../components/breadcrumb.component";
import { HeaderNavComponent } from "../components/header-nav.component";
import { ProductService } from '../services/product.service';
import { CartStore } from '../store/cart.store';
import { Product } from '../models/product';

@Component({
  standalone: true,
  selector: 'productlist',
  providers: [provideIcons({ lucideStar })],
  imports: [RouterLink, HlmIconComponent, HeaderNavComponent],
  template: `
    <app-header-nav />
    <div class="product-details">
      <h1 class="product-name">{{ product()?.name }}</h1>

      <div class="product-image">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product Image"
        />
      </div>

      <div class="product-info">
        <p class="product-price">Price: {{ '$' + product()?.price }}</p>
        <div class="product-rating">
          Rating: @for(star of stars(); track star) {
          <hlm-icon size="sm" name="lucideStar" />
          }
        </div>
        <p class="product-description">{{ product()?.description }}</p>
      </div>

      <div class="additional-info">
        <p>Category ID: {{ product()?.categoryId }}</p>
        <p>Company ID: {{ product()?.companyId }}</p>
        <p>Available Colors:</p>
        <div class="colors">
          @for(color of product()?.colorsId; track color) {
          <div>{{ color }}</div>
          }
        </div>
        <div class="shipping-info">
          <p>
            Free Shipping:
            <span>{{ product()?.freeShip ? '✅ Yes' : '❌ No' }}</span>
          </p>
        </div>

        <div class="actions">
          <button class="btn btn-primary" (click)="addToCart()">Add to Cart</button>
          <button class="btn btn-secondary" routerLink="/cart">Buy Now</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .product-details {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }

      .product-name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 16px;
      }

      .product-image img {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        margin-bottom: 16px;
      }

      .product-info,
      .additional-info,
      .shipping-info {
        margin-bottom: 16px;
      }

      .product-price {
        font-size: 20px;
        font-weight: bold;
        color: green;
      }

      .product-rating .star {
        font-size: 20px;
        color: lightgray;
      }

      .product-rating .star.filled {
        color: gold;
      }

      .colors .color-swatch {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 8px;
        border: 1px solid #ddd;
      }

      .actions button {
        margin-right: 8px;
        padding: 8px 16px;
        border: none;
        cursor: pointer;
      }

      .btn-primary {
        background-color: #007bff;
        color: white;
      }

      .btn-secondary {
        background-color: #6c757d;
        color: white;
      }
    `,
  ],
})
export class ProductDetailsComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cart = inject(CartStore);

  product = toSignal(
    this.route.params.pipe(
      map((params) => params['slug']),
      switchMap((productId) => this.productService.getProductById(productId)),
      tap((product) => {
        console.log(product);
      })
    ),
    { initialValue: null }
  );

  stars = computed(() => [...Array(Math.round(this.product()?.rating || 0)).keys()]);

  addToCart() {
    if(this.product())
      this.cart.addItem(this.product()!)
  }
}
