import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  @Input("product") product;
  @Input("show-actions") showActions=true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {         
     this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;    
    return (this.shoppingCart.items && this.shoppingCart.items[this.product.$key]) 
       ? this.shoppingCart.items[this.product.$key].quantity : 0;    
  }
}
