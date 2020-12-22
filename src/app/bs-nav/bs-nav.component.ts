import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/AppUser';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-bs-nav',
  templateUrl: './bs-nav.component.html',
  styleUrls: ['./bs-nav.component.css']
})
export class BsNavComponent implements OnInit {

  collapsed = true;
  appUser:AppUser;
  cartQuantityCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = (await this.shoppingCartService.getCart());
    cart$.subscribe(cart => {
      this.cartQuantityCount = 0;
      for(let productId in cart.items)
      this.cartQuantityCount += cart.items[productId].quantity;
    })
  }

  logout() {
    this.auth.logout();
  }
}
