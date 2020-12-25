import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './models/order';
import { ShoppingCartService } from './shopping-cart.service';

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
    return this.db.list('/orders').valueChanges().pipe(map(orders => orders as Order[]));
  }

  getOrdersById(userId: string): Observable<Order[]> {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges().pipe(map(orders => orders as Order[]));
  }
}
