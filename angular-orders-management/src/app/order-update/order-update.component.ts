import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {
  orderForm: FormGroup;
  orderId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      product: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.orderId = +id;
      this.orderService.getOrder(this.orderId).subscribe(order => {
        if (order) {
          this.orderForm.setValue({
            product: order.product,
            quantity: order.quantity,
            price: order.price
          });
        }
      });
    } else {
      // Handle the case where id is null, e.g., navigate back or show an error message
      console.error('Order ID is null');
      this.router.navigate(['/orders']);
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const updatedOrder: Order = { id: this.orderId, ...this.orderForm.value };
      this.orderService.updateOrder(updatedOrder);
      this.router.navigate(['/orders']);
    }
  }
}
