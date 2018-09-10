import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule,NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/auth.service';
import { AuthGuard } from 'src/app/auth-guard.service';
import { UserService } from 'src/app/user.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AdminAuthGuard } from 'src/app/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
      
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),        
    AngularFireDatabaseModule,  
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      { path:'', component:HomeComponent },
      { path:'products', component:ProductsComponent }, 
      { path:'login', component:LoginComponent },      
      { path:'shopping-cart', component:ShoppingCartComponent },

      { path:'check-out', component:CheckOutComponent, canActivate: [AuthGuard] },
      { path:'order-success', component:OrderSuccessComponent, canActivate: [AuthGuard] },
      { path:'my/orders', component:MyOrdersComponent, canActivate: [AuthGuard] },
      
      { path:'admin/products/new', component:ProductFormComponent,canActivate: [AuthGuard,AdminAuthGuard] },
      { path:'admin/products/:id', component:ProductFormComponent,canActivate: [AuthGuard,AdminAuthGuard] },
      { path:'admin/products', component:AdminProductsComponent,canActivate: [AuthGuard,AdminAuthGuard] },
      { path:'admin/orders', component:AdminOrdersComponent, canActivate: [AuthGuard,AdminAuthGuard] },

    ])

  ],
  providers: [AngularFireAuth, AuthService, AuthGuard, UserService, AdminAuthGuard, CategoryService,ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
