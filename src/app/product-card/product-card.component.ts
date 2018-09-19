import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  @Input("product") product;
  @Input("show-actions") showActions=true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;  

  constructor(private cartService: ShoppingCartService) {
    console.log("log cart");    
   }
  
  addToCart() {         
    console.log("Product cart called");
    console.log(this.product);
    this.cartService.addToCart(this.product);
  }
}
