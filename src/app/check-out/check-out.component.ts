import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'addressLine1': new FormControl('', [Validators.required]),
    'addressLine2': new FormControl(''),
    'city': new FormControl('', [Validators.required])
  });

  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription

  constructor(private shoppingCartService: ShoppingCartService, private orderService: OrderService, private authService: AuthService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  get name() {
    return this.form.get('name');
  }

  get addressLine1() {
    return this.form.get('addressLine1');
  }

  get addressLine2() {
    return this.form.get('addressLine2');
  }

  get city() {
    return this.form.get('city');
  }

  onSubmit() {
    let order = {
      datePlaced: new Date().getTime(),
      userId: this.userId,
      shipping: this.form.value,
      items: this.cart.items.map(item => {
        return {
          product: {
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price
          },
          quantity: item.quantity,
          totalPrice: item.totalPrice
        }
      })
    };
    this.orderService.saveOrder(order);
  }

}
