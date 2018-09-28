import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {

   items: ShoppingCartItem[] = [];  

    constructor(private itemsMap:{ [productId:string]: ShoppingCartItem}) {
      for(let productId in itemsMap) {        
        let item = itemsMap[productId];        
        this.items.push(new ShoppingCartItem({...item, $key: productId }));
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
      if(this.items) {      
      for(let itemIndex=0;itemIndex<this.items.length;itemIndex++) {         
          count = count + this.items[itemIndex].quantity;
        }      
      }
      return count;
    }

    getQuantity(product: Product) {            
      if(this.itemsMap){        
        let item = this.itemsMap[product.$key];
        let no = item ? item.quantity : 0;        
        return no;
      } 
      return 0;     
    }
} 