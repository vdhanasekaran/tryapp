import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {  
  
  public cart$:Observable<ShoppingCart>;

  constructor(private db:AngularFireDatabase) {
     this.getOrCreateCartId();
     console.log("create called");
   }

  public create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {    
    let cartId = await this.getOrCreateCartId();        
    return this.db.object('/shopping-cart/'+ cartId).valueChanges().map(x =>{
      console.log("assdsd");
        console.log(x['items']);
        return new ShoppingCart(x['items']);
    });
  }

  private getOrCreateCartId() : string {    

    let cartId = localStorage.getItem('cartId'); 
    console.log("cartid : " + cartId);   
    if(cartId)  return cartId;    
        
    let result = this.create();        
    localStorage.setItem('cartId',result.key);
    console.log(result.key);
    return result.key;        
  }

  private getItem(cartId:string,productKey:string) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productKey);        
  }

  private mapProduct(productWithKey:Product) {
    return {
      title:productWithKey.title,
      price:productWithKey.price,
      category:productWithKey.category,
      imageUrl:productWithKey.imageUrl
      };    
  }

  removeFromCart(product: any): any {
    this.updateQuantity(product,-1);
  }

  async addToCart(product:Product) {    
    this.updateQuantity(product,1);
  }

  private async updateQuantity(product:Product,change:number) {    
    let cartId = await this.getOrCreateCartId();        
    let item = this.getItem(cartId,product.$key);    
    item.snapshotChanges().take(1).subscribe(p => {
    item.update({ product: this.mapProduct(product), 
      quantity: (p.payload.toJSON() ? p.payload.toJSON()["quantity"] : 0) + change });      
    });
  }


}
