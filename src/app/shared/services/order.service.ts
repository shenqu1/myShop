import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'shared/models/order';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<Order[]> {
    return this.db.list('/orders').snapshotChanges().pipe(
      map(orders => orders.map(order => ({ key: order.key, ...order.payload.val() as Order })))
    );
  }

  getOrdersById(userId: string): Observable<Order[]> {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges().pipe(
      map(orders => orders.map(order => ({ key: order.key, ...order.payload.val() as Order })))
    );
  }
}
