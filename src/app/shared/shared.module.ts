import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-6-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,    
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),        
    AngularFireDatabaseModule 
  ],
  declarations: [ 
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers:[
    AngularFireAuth, AuthService, AuthGuard, UserService, CategoryService,
    ProductService, ShoppingCartService, OrderService
  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    CommonModule,    
    NgbModule.forRoot().ngModule,
    AngularFireModule,        
    AngularFireDatabaseModule 
  ]
})
export class SharedModule { }
