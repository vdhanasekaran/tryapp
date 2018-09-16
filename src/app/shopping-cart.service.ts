import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';

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

  private getCart(cartId:string) {
    return this.db.object('/shopping-cart/'+ cartId);
  }

  private async getOrCreateCartId(product: Product) {
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

  async addToCart(product:Product) {    
    let cartId = await this.getOrCreateCartId(product); 
    console.log(cartId + " " + product.$key);
    let item = this.getItem(cartId,product.$key);    
    item.snapshotChanges().take(1).subscribe(p => {
    item.update({ product: this.mapProduct(product), 
      quantity: (p.payload.toJSON() ? p.payload.toJSON()["quantity"] : 0) + 1 });
      
    });
  }
}
