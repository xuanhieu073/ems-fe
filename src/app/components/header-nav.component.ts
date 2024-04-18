import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header-nav',
  imports: [RouterLink],
  template: `
    <nav
      class="flex justify-between items-center px-10 py-3 max-w-[1200px] mx-auto"
    >
      <img
        src="assets/images/commerce/logo.svg"
        width="{172}"
        height="{52}"
        alt="logo"
      />
      <ul class="flex gap-x-4">
        <li class="text-[#324d67] text-sm leading-6 tracking-widest">
          <a [routerLink]="['/']">Home</a>
          <div class="'opacity-1 w-full h-[2px] bg-[#ab7a5f]"></div>
        </li>
        <li class="text-[#324d67] text-sm leading-6 tracking-widest">
          <a [routerLink]="['/about']">About</a>
          <div class="opacity-1 w-full h-[2px] bg-[#ab7a5f]"></div>
        </li>
        <li class="text-[#324d67] text-sm leading-6 tracking-widest">
          <a [routerLink]="['/products']">Products</a>
          <div class="opacity-1 w-full h-[2px] bg-[#ab7a5f]"></div>
        </li>
      </ul>
      <div class="flex gap-4">
        <div class="flex items-center gap-x-2">
          <p class="text-xl">Cart</p>
          <img
            src="/assets/images/commerce/cart.svg"
            width="{24}"
            height="{24}"
            alt="cart"
          />
        </div>
        <div class="flex items-center gap-x-2">
          <p class="text-xl">Login</p>
          <img
            src="/assets/images/commerce/login.svg"
            width="{24}"
            height="{24}"
            alt="cart"
          />
        </div>
      </div>
    </nav>
  `,
})
export class HeaderNavComponent {}
