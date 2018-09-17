import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {  
  
  constructor(private db:AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-cart/'+ cartId);
  }

  private async getOrCreateCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');    
    if(cartId)  return cartId;    

    let result = await this.create();    
    localStorage.setItem('cartId',result.key);
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
    console.log(change);
    let cartId = await this.getOrCreateCartId();     
    let item = this.getItem(cartId,product.$key);    
    item.snapshotChanges().take(1).subscribe(p => {
    item.update({ product: this.mapProduct(product), 
      quantity: (p.payload.toJSON() ? p.payload.toJSON()["quantity"] : 0) + change });      
    });
  }


}
