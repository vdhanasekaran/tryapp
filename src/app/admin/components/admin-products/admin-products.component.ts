import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  
  products : Product[];
  filteredProducts: Product[];
  subscription: Subscription;  
  constructor(private productService:ProductService) {
     this.subscription = this.productService.getAll().snapshotChanges().subscribe(products => {
     this.initializeTable(products);
     });     
   }

  initializeTable(products) {
    this.products = [];
    this.filteredProducts = [];       
    products.forEach(product => {
       var y=product.payload.toJSON();
       y["$key"] = product.key;
       this.products.push(y as Product);
       this.filteredProducts.push(y as Product);
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
     this.subscription.unsubscribe();
  }

  filter(query:string) {
    this.filteredProducts = (query)? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
                            : this.products;
  }


}
