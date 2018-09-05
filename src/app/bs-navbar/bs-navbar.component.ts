import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  
  user$: Observable<firebase.User>;
  isCollapsed = true;
  constructor(private afAuth: AngularFireAuth) {
       this.user$ = afAuth.authState;
   }

  logout() {
    this.afAuth.auth.signOut();
  }
}
