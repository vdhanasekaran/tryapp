import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { Shipping } from 'shared/models/shipping';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping: Shipping = new Shipping();
  userId: string;
  userSubscription: Subscription;
  constructor(private authService: AuthService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  placeOrder() {
    let order = new Order(this.userId,this.shipping,this.cart);
    let result = this.orderService.placeOrder(order);    
    this.router.navigate(['order-success', result.key]);
  }
  
  ngOnDestroy(): void {    
    this.userSubscription.unsubscribe();
  }

}
