import { ShoppingCart } from "./shopping-cart";

export class Order {
  dateCreated: number;
  items: any[];
  constructor(public userId: string, public shipping: any, cart: ShoppingCart) {
    this.dateCreated = new Date().getTime();
    this.items = cart.items.map(item => {
      return {
        product: {
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      }
    });
  }
}
