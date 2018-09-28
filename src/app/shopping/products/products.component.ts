import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Category } from 'shared/models/category';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {  
  
  products$;     
  category:string;
  productList: Product[] = [];
  filteredProductList: Product[] = [];    
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService:ProductService,
    public shoppingCartService: ShoppingCartService
    ) {  }

  async ngOnInit() {            
    this.cart$ = await this.shoppingCartService.getCart();        
    this.populateProducts();
  }

  populateProducts() {
    this.products$ = this.productService.getAll().snapshotChanges().switchMap(item => {        
      this.productList = [];
      this.filteredProductList = [];
      item.forEach(product => {
        var y = product.payload.toJSON();          
        y["$key"] = product.key;          
        if(y != null) {                                          
          this.productList.push(y as Product);              
        }
      });
      this.filteredProductList = this.productList;       
      return this.route.queryParamMap;
      })
      .subscribe(params => {        
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  applyFilter() {
    this.filteredProductList = 
          (this.category) ? 
            this.productList.filter(p => 
              p.category.toLowerCase().includes(this.category.toLowerCase())):
              this.productList; 
  }
}
