import { ComponentStore } from "@ngrx/component-store"
import { Product } from "../models/product"
import { computed, effect, Injectable, signal } from "@angular/core";

export type CartItem = {
  product: Product;
  quantity: number;
}

@Injectable({providedIn: 'root'})
export class CartStore {
  cartItems = signal<CartItem[]>(JSON.parse(localStorage.getItem('cart') || 'null') || []);

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    })
  }

  totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  tax = computed(() => this.subtotal() * 0.1);

  grandTotal = computed(() => this.subtotal() + this.tax());

  addItem(product: Product) {
    if(!this.cartItems().find(item => item.product.id === product.id))
      this.cartItems.set([...this.cartItems(),{product, quantity: 1}])
  }

  increaseQuantity(index: number) {
    const changedItem = {...this.cartItems()[index], quantity: this.cartItems()[index].quantity++};
    this.cartItems.set(this.cartItems().splice(index, 1, changedItem))
  }

  decreaseQuantity(index: number) {
    if (this.cartItems()[index].quantity > 1) {
      const changedItem = {...this.cartItems()[index], quantity: this.cartItems()[index].quantity--};
      this.cartItems.set(this.cartItems().splice(index, 1, changedItem))
    }
  }

  removeItem(index: number) {
    this.cartItems.set(this.cartItems().filter((item, i) => i !== index));
  }
}