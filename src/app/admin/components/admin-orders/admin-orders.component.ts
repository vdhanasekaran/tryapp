import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: Order[]= [];
  
  constructor(private orderService: OrderService) {
     this.orderService.getOrders().valueChanges().subscribe(orders => {
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
