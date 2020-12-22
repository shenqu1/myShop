import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/AppUser';
import { ShoppingCart } from '../models/shopping-cart';
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
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = (await this.shoppingCartService.getCart());
  }

  logout() {
    this.auth.logout();
  }
}
