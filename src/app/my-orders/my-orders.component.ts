import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[]= [];
  userId : string;
  constructor(private orderService: OrderService,private authService: AuthService) {
     this.authService.user$.subscribe(user => this.userId = user.uid);
     this.orderService.getOrdersByUser(this.userId).valueChanges().subscribe(orders => {
      this.initializeTable(orders);
      });      
   }

   initializeTable(orders) {
     console.log(orders);
    this.orders = [];         
    orders.forEach(order => {             
       this.orders.push(order);       
    });
   }

  ngOnInit() {
  }

}
