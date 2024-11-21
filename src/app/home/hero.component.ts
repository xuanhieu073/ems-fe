import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ButtonComponent } from '../components/button.component';

@Component({
  standalone: true,
  selector: 'home-hero',
  imports: [ButtonComponent, RouterLink],
  template: `
    <div class="px-4 py-[217px] max-w-[1170px] mx-auto">
      <div class="flex gap-[140px]">
        <div>
          <h1 class="font-bold text-5xl leading-[1.2] mb-8 text-[#102a42]">
            Buy Your
            <br />
            Furniture Online
          </h1>
          <p class="font-normal text-xl leading-10 mb-8 text-[#617d98]">
            A one stop solution for purchasing your home decor! This is an
            e-commerce application listing a range of furniture products for
            home & office. The products can be filtered on the basis of their
            Category, Company, Colour, Price & Shipping Charges. The products
            can be added to the cart and then proceeded to the checkout. The
            checkout allows you to pay with your Debit / Credit cards using
            Stripe payments.
          </p>
          <app-button routerLink="/products" text="SHOW NOW" ></app-button>
        </div>
        <div
          class="flex-shrink-0 pt-7 relative after:content-[''] after:absolute after:bottom-0 after:-left-11 after:w-11 after:h-[440px] after:bg-[#decbc0] -z-10"
        >
          <img
            src="/assets/images/commerce/hero.jpeg"
            class="w-[440px] rounded-md flex-shrink-0 h-full object-cover"
            alt="hero"
          />
          <img
            src="/assets/images/commerce/hero-sub.jpeg"
            alt="hero-sub"
            class="w-[250px] h-[165px] absolute bottom-0 -left-[128px] rounded-md z-10"
          />
        </div>
      </div>
    </div>
  `,
})
export class HeroComponent {}
