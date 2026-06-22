import { computed, inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>(this.getStoredCart());
   private toastService = inject(ToastService);
  totalItems = computed(() =>
     this.cartItems().length
  );

  grandTotal = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  addToCart(product: Product): void {

  const cart = [...this.cartItems()];

  const existingProduct = cart.find(
    item => item.id === product.id
  );

  if (existingProduct) {

    this.toastService.showToast(
      'Item already added to cart',
      'error'
    );

    return;
  }

  cart.push({
    ...product,
    quantity: 1
  });

  this.cartItems.set(cart);

  this.saveCart();

  this.toastService.showToast(
    'Product added successfully',
    'success'
  );
}

  increaseQuantity(id: number): void {

    const cart = [...this.cartItems()];

    const item = cart.find(x => x.id === id);

    if (item) {
      item.quantity++;
    }

    this.cartItems.set(cart);
    this.saveCart();
  }

 decreaseQuantity(id: number): void {

  const cart = [...this.cartItems()];

  const item = cart.find(x => x.id === id);

  if (!item) {
    return;
  }

  if (item.quantity === 1) {

    this.cartItems.set(
      cart.filter(x => x.id !== id)
    );

    this.saveCart();

    this.toastService.showToast(
      'Product removed from cart',
      'success'
    );

    return;
  }

  item.quantity--;

  this.cartItems.set(cart);

  this.saveCart();
}

  removeProduct(id: number): void {

    this.cartItems.set(
      this.cartItems().filter(item => item.id !== id)
    );

    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem(
      'cart',
      JSON.stringify(this.cartItems())
    );
  }

  private getStoredCart(): CartItem[] {

    const cart = localStorage.getItem('cart');

    return cart ? JSON.parse(cart) : [];
  }
}