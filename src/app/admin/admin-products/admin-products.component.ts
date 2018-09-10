import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products : Product[];

  constructor(private productService:ProductService) {
     this.productService.getAll().snapshotChanges().subscribe(products => {
       this.products = [];
       products.forEach(product => {
          var y=product.payload.toJSON();
          y["$key"] = product.key;
          this.products.push(y as Product);
       });
     });     
   }

  ngOnInit() {
  }

}
