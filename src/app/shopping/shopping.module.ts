import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [    
    SharedModule,    
    RouterModule.forChild([
      { path:'products', component:ProductsComponent }, 
      { path:'shopping-cart', component:ShoppingCartComponent },
      { path:'check-out', component:CheckOutComponent, canActivate: [AuthGuard] },
      { path:'order-success/:id', component:OrderSuccessComponent, canActivate: [AuthGuard] },
      { path:'my/orders', component:MyOrdersComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    ProductFilterComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent    
  ]
})
export class ShoppingModule { }
