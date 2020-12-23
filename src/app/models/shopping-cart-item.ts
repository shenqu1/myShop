import { ShoppingCart } from "./shopping-cart";

export class ShoppingCartItem {
  key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;

  constructor(init?: Partial<ShoppingCart>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
