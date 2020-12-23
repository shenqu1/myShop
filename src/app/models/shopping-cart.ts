import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: {[productId: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    for(let productId in itemsMap){
      let shoppingCartItem = new ShoppingCartItem({key: productId, ...itemsMap[productId]});
      this.items.push(shoppingCartItem);
    }

  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
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
    sum += item.totalPrice;
    return sum;
  }

}
