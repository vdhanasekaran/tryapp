import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'tryapp/src/app/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;
  constructor(private productService:ProductService,private categoryService:CategoryService) {
    this.products$ = productService.getAll().valueChanges();
    this.categories$ = categoryService.getAll().valueChanges();
  }
}
