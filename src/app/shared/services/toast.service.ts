import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  show = signal(false);
  message = signal('');
  type = signal<'success' | 'error'>('success');

  showToast(
    message: string,
    type: 'success' | 'error'
  ): void {

    this.message.set(message);
    this.type.set(type);
    this.show.set(true);

    setTimeout(() => {
      this.show.set(false);
    }, 3000);
  }
}
