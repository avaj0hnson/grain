import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  type: ToastType;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(type: ToastType, text: string) {
    this.toastSubject.next({ type, text });
    setTimeout(() => this.toastSubject.next(null), 4000);
  }

  success(text: string) {
    this.show('success', text);
  }

  error(text: string) {
    this.show('error', text);
  }

  info(text: string) {
    this.show('info', text);
  }
}
