import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterConfigOptions } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header-nav',
  imports: [RouterModule],
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
      <ul class="flex gap-x-4 navbar-nav">
        <li routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}" class="text-[#324d67] text-sm leading-6 tracking-widest">
          <a [routerLink]="['/']" >Home</a>
          <div class="opacity-0 w-full h-[2px] bg-[#ab7a5f]"></div>
        </li>
        <li routerLinkActive="active" class="text-[#324d67] text-sm leading-6 tracking-widest nav-item">
          <a [routerLink]="['/about']">About</a>
          <div class="opacity-0 w-full h-[2px] bg-[#ab7a5f] nav-link"></div>
        </li>
        <li routerLinkActive="active" class="text-[#324d67] text-sm leading-6 tracking-widest">
          <a [routerLink]="['/products']">Products</a>
          <div class="opacity-0 w-full h-[2px] bg-[#ab7a5f]"></div>
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
  styles: [
    `
      .active {
        div {
          @apply opacity-100;
        }
      }
    `,
  ],
})
export class HeaderNavComponent {}
