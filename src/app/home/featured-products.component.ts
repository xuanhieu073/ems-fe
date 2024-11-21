import { Component } from '@angular/core';
import { ButtonComponent } from '../components/button.component';

@Component({
  standalone: true,
  selector: 'home-featured-products',
  template: `
    <section class="px-9 py-20 bg-[#f1f5f8]">
      <div class="mb-16 flex flex-col items-center gap-3">
        <h2 class="text-center text-4xl font-bold">Featured Products</h2>
        <div class="h-1 w-24 bg-[#ab7a5f]"></div>
      </div>
      <div class="grid grid-cols-3 gap-10 mb-16">
        @for(product of products; track product.id) {
        <div>
          <img
            src="/assets/images/commerce/product-7.jpeg"
            width="{400}"
            height="{225}"
            alt="product image"
            class="rounded-sm mb-[18px]"
          />
          <div class="flex justify-between items-center">
            <p class="text-[#102a42] text-sm tracking-widest">
              {{ product.name }}
            </p>
            <span class="text-[#ab6a5f] text-[15px]">
              $ {{ product.price }}
            </span>
          </div>
        </div>
        }
      </div>
      <div class="flex justify-center">
        <app-button text="ALL PRODUCTS" size="sm" />
      </div>
    </section>
  `,
  imports: [ButtonComponent],
})
export class FeaturedProductsComponent {
  products = [
    {
      id: 1,
      image: '/commerce/product-7.jpeg',
      name: 'Entertainment Center',
      price: '399.99',
    },
    {
      id: 2,
      image: '/commerce/product-7.jpeg',
      name: 'Hight-Back Bench',
      price: '399.99',
    },
    {
      id: 3,
      image: '/commerce/product-7.jpeg',
      name: 'Modern Bookshelf',
      price: '399.99',
    },
  ];
}
