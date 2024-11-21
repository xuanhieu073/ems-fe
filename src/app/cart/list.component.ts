import { Component, computed, inject, signal } from '@angular/core';
import { HeaderNavComponent } from '../components/header-nav.component';
import { ButtonComponent } from '../components/button.component';
import { CartStore } from '../store/cart.store';

@Component({
  standalone: true,
  template: `
    <app-header-nav />
    <div class="cart-page">
      <h1 class="cart-title">Shopping Cart</h1>

      <div class="cart-items">
        @for(item of cart.cartItems(); track item.product.name; let i = $index) {
        <div class="cart-item">
          <div class="item-info">
            <h3>{{ item.product.name }}</h3>
            <p class="item-price">Price: $ {{ item.product.price }}</p>
            <p class="item-total">Total: $ {{ item.product.price * item.quantity }}</p>
          </div>

          <div class="item-controls">
            <button (click)="cart.decreaseQuantity(i)">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button (click)="cart.increaseQuantity(i)">+</button>
            <button class="remove" (click)="cart.removeItem(i)">Remove</button>
          </div>
        </div>
        }
      </div>
      <!-- Cart Summary -->
      <div class="cart-summary">
        <h3>Summary</h3>
        <p>Total Items: {{ cart.totalItems() }}</p>
        <p>Subtotal: $ {{ cart.subtotal() }}</p>
        <p>Tax (10%): $ {{ cart.tax() }}</p>
        <p class="grand-total">Total: $ {{ cart.grandTotal() }}</p>
        <app-button text="Proceed to Checkout" />
      </div>
    </div>
  `,
  styles: [
    `
      .cart-page {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: auto;
        padding: 16px;
      }

      .cart-title {
        text-align: center;
        margin-bottom: 20px;
      }

      .cart-items {
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
      }

      .cart-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .item-info {
        max-width: 60%;
      }

      .item-price,
      .item-total {
        font-size: 14px;
        color: #555;
      }

      .item-controls {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      button {
        padding: 5px 10px;
        border: none;
        cursor: pointer;
      }

      button.remove {
        background-color: #f44336;
        color: white;
        border-radius: 4px;
      }

      button:disabled {
        cursor: not-allowed;
      }

      .cart-summary {
        text-align: right;
      }

      .cart-summary h3 {
        margin-bottom: 10px;
      }

      .grand-total {
        font-weight: bold;
      }

      .checkout-btn {
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
      }

      .checkout-btn:hover {
        background-color: #45a049;
      }
    `,
  ],
  imports: [HeaderNavComponent, ButtonComponent],
})
export class CartListComponent {
  cart = inject(CartStore)
}
