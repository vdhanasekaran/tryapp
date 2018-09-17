import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  
  appUser:AppUser;
  isCollapsed = true;
  shoppingCartItemCount:number;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    
  }

  logout() {    
    this.auth.logout();    
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount= 0;
      for(let productId in cart.items) {
        this.shoppingCartItemCount = this.shoppingCartItemCount + cart.items[productId].quantity;
      }
    });
  }
}
