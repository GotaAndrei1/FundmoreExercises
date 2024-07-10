import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.css']
})
export class OrderDeleteComponent implements OnInit {
  order: Order | undefined; // Use undefined to indicate that it can be uninitialized

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const orderId = +id;
      this.orderService.getOrder(orderId).subscribe(order => {
        if (order) {
          this.order = order;
        } else {
          // Handle case where order is not found, e.g., navigate back or show an error message
          console.error('Order not found');
          this.router.navigate(['/orders']);
        }
      });
    } else {
      // Handle the case where id is null, e.g., navigate back or show an error message
      console.error('Order ID is null');
      this.router.navigate(['/orders']);
    }
  }

  deleteOrder(): void {
    if (this.order) {
      this.orderService.deleteOrder(this.order.id);
      this.router.navigate(['/orders']);
    }
  }
}
