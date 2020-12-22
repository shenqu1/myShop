import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from './models/product';

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

  async getCart() {
    let cardId = await this.getOrCreatCartId();
    return this.db.object('/shopping-carts/' + cardId).valueChanges()
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

  async addToCart(product: Product) {
    let cardId = await this.getOrCreatCartId();
    let item$ = this.getItem(cardId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => item$.update({product: product, quantity: (item ? item.quantity : 0) + 1}));
  }
}
