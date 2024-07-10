import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService, private router: Router) {
    this.orderForm = this.fb.group({
      product: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const newOrder = { id: Date.now(), ...this.orderForm.value };
      this.orderService.addOrder(newOrder);
      this.router.navigate(['/orders']);
    }
  }
}
