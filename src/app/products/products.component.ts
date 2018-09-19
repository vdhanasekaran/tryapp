import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Category } from '../models/category';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {  
  
  products$;     
  category:string;
  productList: Product[] = [];
  filteredProductList: Product[] = [];  
  subscription:Subscription;
  cart;
  constructor(
    route: ActivatedRoute,
    private productService:ProductService,
    public shoppingCartService: ShoppingCartService
    ) {

      this.products$ = productService.getAll().snapshotChanges().switchMap(item => {        
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
        return route.queryParamMap;
        })
        .subscribe(params => {        
          this.category = params.get('category');
            
          this.filteredProductList = 
            (this.category) ? 
              this.productList.filter(p => 
                p.category.toLowerCase().includes(this.category.toLowerCase())):
                this.productList; 
          console.log("Filter");
          console.log(this.filteredProductList);         
        });
  }

  async ngOnInit() {    
  }

  async ngAfterViewInit() {
   this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);         
   //this.shoppingCartService.cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
}
