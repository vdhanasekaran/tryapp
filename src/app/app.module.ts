import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from 'shared/shared.module';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';
import { ProductsComponent } from './shopping/products/products.component';
import { LoginComponent } from './core/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,    
    BrowserModule,
    RouterModule.forRoot([
      { path:'', component:ProductsComponent },      
      { path:'login', component:LoginComponent }
    ])
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }