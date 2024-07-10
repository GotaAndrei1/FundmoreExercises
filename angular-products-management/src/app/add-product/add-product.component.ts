import { Component } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  newProduct: Product = { id: 0, name: '', price: 0 };

  constructor(private productService: ProductService) { }

  addProduct(): void {
    this.newProduct.id = this.productService.getProducts().length + 1;
    this.productService.addProduct(this.newProduct);
    this.newProduct = { id: 0, name: '', price: 0 };
  }
}
