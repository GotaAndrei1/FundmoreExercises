import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    { id: 1, product: 'Product 1', quantity: 10, price: 100 },
    { id: 2, product: 'Product 2', quantity: 5, price: 50 },
  ];

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrder(id: number): Observable<Order | undefined> {
    return of(this.orders.find(order => order.id === id));
  }

  addOrder(order: Order): void {
    this.orders.push(order);
  }

  updateOrder(order: Order): void {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index > -1) {
      this.orders[index] = order;
    }
  }

  deleteOrder(id: number): void {
    this.orders = this.orders.filter(order => order.id !== id);
  }
}
