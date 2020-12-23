import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private creat() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cardId = await this.getOrCreatCartId();
    return this.db.object('/shopping-carts/' + cardId).valueChanges().pipe(
      map(cart => new ShoppingCart(cart['items']))
    );
  }

  private getItem(cardId: string, productId: string): AngularFireObject<any> {
    return this.db.object('/shopping-carts/' + cardId + '/items/' + productId);
  }

  private async getOrCreatCartId() {
    let cartId = localStorage.getItem('cartId');

    if(!cartId) {
      let result = await this.creat();
      localStorage.setItem('cartId', result.key);
      return result.key;
    } else
    return cartId;
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: Product, change: number) {
    let cardId = await this.getOrCreatCartId();
    let item$ = this.getItem(cardId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => item$.update({
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: (item ? item.quantity : 0) + change
    }));
  }
}
