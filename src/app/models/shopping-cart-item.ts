import { Product } from "./product";

export class ShoppingCartItem {
   
    constructor(public product:Product,public quantity:number) {
        
    }

    get total() {
       return this.product.price * this.quantity;
    }
}