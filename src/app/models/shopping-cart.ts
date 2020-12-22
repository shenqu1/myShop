import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: {[productId: string]: ShoppingCartItem}) {
    for(let productId in itemsMap){
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }

  }

  get quantity() {
    let quantity = 0;
    for(let productId in this.itemsMap)
    quantity += this.itemsMap[productId].quantity;
    return quantity;
  }

  get totalPrice() {
    let sum = 0;
    for (let item of this.items)
    sum += item.price;
    return sum;
  }

}