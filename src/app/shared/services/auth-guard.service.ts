import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import  'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
constructor(private router:Router, private auth: AuthService) {
   
}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {   
  return this.auth.user$.map(user => {
    if(user) return true;
    this.router.navigate(['/login'], { queryParams: { returnUrl:state.url } });
    return false;
  });
 }
}
