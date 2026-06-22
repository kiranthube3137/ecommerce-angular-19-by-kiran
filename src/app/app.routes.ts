import { Routes } from '@angular/router';
import { LayoutComponent } from './core/component/layout/layout.component';

export const routes: Routes = [
    {
    path: '',
    component: LayoutComponent,
    children: [
         {
        path: '',
        redirectTo:"products",
        pathMatch:"full"
      },
    {
        path: 'products',
        loadComponent: () => import('./features/products-list/products-list.component').then(m=>m.ProductsListComponent)
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component')
            .then(m => m.CartComponent)
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component')
            .then(m => m.ContactComponent)
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];
