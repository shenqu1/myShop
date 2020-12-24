import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'addressLine1': new FormControl('', [Validators.required]),
    'addressLine2': new FormControl(''),
    'city': new FormControl('', [Validators.required])
  });

  @Input('cart') cart: ShoppingCart;
  userId: string;
  subscription: Subscription

  constructor(private orderService: OrderService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onSubmit() {
    let order = new Order(this.userId, this.form.value, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
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
}
