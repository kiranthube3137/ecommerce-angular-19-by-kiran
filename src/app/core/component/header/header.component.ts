import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../features/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,
    RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
protected cartService = inject(CartService);
}
