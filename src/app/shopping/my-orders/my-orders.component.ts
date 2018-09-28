import { Component, OnInit } from '@angular/core';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[]= [];
  userId : string;
  constructor(private orderService: OrderService,private authService: AuthService) {
     let order$ = this.authService.user$.switchMap(user => orderService.getOrdersByUser(user.uid).valueChanges());
     order$.subscribe(order => {
       this.initializeTable(order);
     })
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
