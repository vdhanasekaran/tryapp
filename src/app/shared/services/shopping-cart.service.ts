import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  public cart$:Observable<ShoppingCart>;

  constructor(private db:AngularFireDatabase) {
     this.getOrCreateCartId();     
   }

   getCart(): Observable<ShoppingCart> {    
    let cartId = this.getOrCreateCartId();            
    return this.db.object('/shopping-cart/'+ cartId).valueChanges().map(x =>{        
      if(x) {        
        return new ShoppingCart(x['items']);
      }
    });
  }

  removeFromCart(product: any): any {
    this.updateItem(product,-1);
  }

  async addToCart(product:Product) {    
    this.updateItem(product,1);
  }

  public create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }  

  private getOrCreateCartId() : string {    

    let cartId = localStorage.getItem('cartId');     
    if(cartId)  return cartId;    
        
    let result = this.create();        
    localStorage.setItem('cartId',result.key);    
    return result.key;        
  }

  private getItem(cartId:string,productKey:string) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productKey);        
  }

  clearCart(): any {
    let cartId = this.getOrCreateCartId();    
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
    
  }

  private async updateItem(product:Product,change:number) {        
    let cartId = await this.getOrCreateCartId();        
    let item = this.getItem(cartId,product.$key);    
    item.snapshotChanges().take(1).subscribe(p => {
       let productToUpdate=p.payload.toJSON();
       let quantity = ((productToUpdate && productToUpdate["quantity"]) || 0) + change;
       if(quantity === 0) {
         item.remove();
       } else {
       item.update({
           title: product["title"],
           imageUrl: product["imageUrl"],
           price: product["price"],
           quantity: quantity
          });
       }    
    });
  }
}
