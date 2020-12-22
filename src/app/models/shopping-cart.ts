import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

  constructor(public items: ShoppingCartItem[]) {}

  get quantity() {
    let quantity = 0;
    for(let productId in this.items)
    quantity += this.items[productId].quantity;
    return quantity;
  }
}
