import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ToastComponent } from '../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,HeaderComponent,ToastComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone:true
})
export class LayoutComponent {

}
