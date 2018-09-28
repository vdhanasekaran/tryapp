import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;  
  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();    
  }

  clearCart() {
    console.log(" clear cart ");
    this.shoppingCartService.clearCart();
  }
}
