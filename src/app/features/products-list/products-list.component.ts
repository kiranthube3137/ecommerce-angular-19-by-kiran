import { Component, computed, inject, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products-list',
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  public products = signal<Product[]>([]);
  public loading = signal<boolean>(false);

  public search = signal<string>('');
  public category = signal<string>('All');

  public filteredProducts = computed<Product[]>(() => {
    return this.products().filter(product => {

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(this.search().toLowerCase());

      const categoryMatch =
        this.category() === 'All' ||
        product.category === this.category();

      return searchMatch && categoryMatch;
    });
  });

  public ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading.set(true);

    this.productService.getProducts().subscribe({
      next: (data:Product[]) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.loading.set(false);
      }
    });
  }

  public addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}