import { computed, inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItems = signal<CartItem[]>(this.getStoredCart());

  private toastService = inject(ToastService);

  public totalItems = computed<number>(() =>
    this.cartItems().length
  );

  public grandTotal = computed<number>(() =>
    this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  public addToCart(product: Product): void {

    const cart: CartItem[] = [...this.cartItems()];

    const existingProduct: CartItem | undefined = cart.find(
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

  public increaseQuantity(id: number): void {

    const cart = [...this.cartItems()];

    const item: CartItem | undefined = cart.find(x => x.id === id);

    if (item) {
      item.quantity++;
    }

    this.cartItems.set(cart);

    this.saveCart();
  }

  public decreaseQuantity(id: number): void {

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

  public removeProduct(id: number): void {

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