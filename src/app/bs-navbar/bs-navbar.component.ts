import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser:AppUser;
  isCollapsed = true;
  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {    
    this.auth.logout();    
  }
}
