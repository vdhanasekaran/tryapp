import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {

   items: ShoppingCartItem[] = [];  

    constructor(public itemsMap:{ [productId:string]: ShoppingCartItem}) {
      for(let productId in itemsMap) {
        console.log(productId);
        let item = itemsMap[productId];
        var shoppingCartItem = new ShoppingCartItem(item.product,item.quantity);
        this.items.push(shoppingCartItem);
      }
    }  
    
    get totalPrice() {
      let total = 0;
      for(let item of this.items){
        total = total + item.total;
      }
      return total;
    }

    get totalItemsCount() {
      let count= 0;      
      for(let productId in this.itemsMap) {        
        count = count + this.itemsMap[productId].quantity;
      }
      return count;
    }

    getQuantity(product: Product) {
      console.log(product);
      if(this.itemsMap){
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
      } 
      return 0;     
    }
}